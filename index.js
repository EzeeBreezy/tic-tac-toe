const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const config = require('config')
// const mongoose = require('mongoose')


//!SOCKET DEPENDENCIES
const User = require('./models/User')
const Game = require('./models/Game')
const bcrypt = require('bcryptjs')
// const config = require('config')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const validator = require('validator')
//! END OF SOCKET DEPENDENCIES

const PORT = config.get('port') || 5000

//!SOCKET STUFF
// const emitRequestReply = (socket, replyType, statusCode, msg, data = null) => socket.emit(replyType, { status: statusCode, message: msg, data })
const emitError = (socket, statusCode, msg) => socket.emit('requestError', { status: statusCode, message: msg })
const emitSuccess = (socket, statusCode, msg, data = null) =>
   socket.emit('requestSuccess', { status: statusCode, message: msg, data })

io.on('connection', socket => {
   console.log(`***user ${socket.id} connected`)
   socket.emit('connection established', { socketId: socket.id })

   socket.on('disconnect', () => {
      console.log(`***user ${socket.id} disconnected`)
   })

   socket.on('authorization request', async (data) => {
      console.log(`***user ${socket.id} Authorization request`)
      try {
         const { login, password } = data

         let validationPassed = (validator.isEmail(login) && validator.isLength(password, { min: 6 })) || false
         if (!validationPassed) return emitError(socket, 400, 'Invalid type of credentials') 

         const user = await User.findOne({ login })
         if (!user) return emitError(socket, 404, 'User not found')

         const isMatch = await bcrypt.compare(password, user.password)
         if (!isMatch) return emitError(socket, 401, 'User not found')

         const token = JSON.stringify(jwt.sign({ userId: user.id }, config.get('jwtSecret'), { expiresIn: '1h' }))

         emitSuccess(socket, 200, 'Authorization procedure passed successfully', { token, userId: user.id })
      } catch (e) {
         emitError(socket, 500, 'Something went wrong, try again')
      }
   })

   socket.on('registration request', async (data) => {
      console.log(`***user ${socket.id} Registration request`)
      try {
         const { login, password } = data
         
         let validationPassed = (validator.isEmail(login) && validator.isLength(password, { min: 6 })) || false
         if (!validationPassed) return emitError(socket, 400, 'Invalid type of credentials')

         const candidate = await User.findOne({ login })
         if (candidate) return emitError(socket, 409, 'User already exists')

         const hashedPassword = await bcrypt.hash(password, 12)
         const user = new User({ login, password: hashedPassword })

         await user.save()
         emitSuccess(socket, 201, 'User created successfully', user.id)
      } catch (e) {
         emitError(socket, 500, 'Something went wrong, try again')
      }
   })

   socket.on('reconnect request', async (data) => {
      console.log(`***user ${socket.id} Reconnect request`)
      try {
         const decoded = jwt.verify(JSON.parse(data), config.get('jwtSecret'))

         const user = await User.findOne({ "_id": decoded.userId })
         if (!user) return emitError(socket, 404, 'User not found')

         const token = JSON.stringify(jwt.sign({ userId: user.id }, config.get('jwtSecret'), { expiresIn: '1h' }))

         emitSuccess(socket, 200, 'Authorization procedure passed successfully', { token, userId: user.id })
      } catch (e) {
         emitError(socket, 500, 'Something went wrong, try again')
      }
   })

})

//!END OF SOCKET STUFF

async function start() {
   try {
      await mongoose.connect(config.get('mongoURI'), {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true
      })
      server.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
   } catch (e) {
      console.log('Server Error', e.message)
      process.exit(1)
   }
}

start()

//TODO check custom namespaces socket.io

//TODO socket routes-handlers

//TODO express static middleware

//TODO telegram bot?
//TODO chat?

//TODO redux on back

