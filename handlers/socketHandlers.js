const User = require('../models/User')
const Game = require('../models/Game')
const Message = require('../models/Message')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const validator = require('validator')
// const store = require('../reducers/Redux-store')
// const userActions = require('../actions/userActions')

const emitError = (socket, statusCode, msg) => socket.emit('requestError', { status: statusCode, message: msg })
const emitSuccess = (socket, statusCode, msg, data = null) =>
   socket.emit('requestSuccess', { status: statusCode, message: msg, data })

// store.subscribe(() => console.log(store.getState()))

const userSocketRegistry = {}

;(async () => {
   let users = await User.find()
   //!!!!!!!!!!!!!!!!
   users.map(user => (userSocketRegistry[user._doc._id] = null))
   //!!!!!!!!!!!!!!
   // const clearedUsers = users.map(user => {
   //    const { messages, __v, password, avatar, login, ...clearedUser } = user._doc
   //    return clearedUser
   // })
   // store.dispatch(userActions.actionUpdateUsers(clearedUsers))
})()

function socketHandlers(socket) {
   console.log(`***user ${socket.id} connected`)


   //*=========================DISCONNECT==============================
   socket.on('disconnect', async () => {
      console.log(`***user ${socket.id} disconnected`)
      try {
         let id 
         for (let key in userSocketRegistry) if (userSocketRegistry[key] === socket.id) id = userSocketRegistry[key]
         
         console.log("ID:", id)
         await User.findOneAndUpdate({ _id: id }, { status: "OFFLINE" })

         userSocketRegistry[id] = null

         let users = await User.find()
   
         const clearedUsers = users.map(user => {
            const { messages, __v, password, avatar, login, ...clearedUser } = user._doc
            return clearedUser
         })
   
         socket.broadcast.emit('players', clearedUsers)
         //TODO fix disconnect
   
      } catch (e) {
         emitError(socket, 500, 'Something went wrong, try again')
      }




   })

   //*=========================AUTHORIZATION==============================

   socket.on('authorization request', async data => {
      console.log(`***user ${socket.id} Authorization request`)
      try {
         const { login, password } = data

         let validationPassed = (validator.isEmail(login) && validator.isLength(password, { min: 6 })) || false
         if (!validationPassed) return emitError(socket, 400, 'Invalid type of credentials')

         let user = await User.findOneAndUpdate({ login }, { status: "READY" })
         if (!user) return emitError(socket, 404, 'User not found')

         const isMatch = await bcrypt.compare(password, user.password)
         if (!isMatch) return emitError(socket, 401, 'User not found')

         //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         userSocketRegistry[user.id] = socket.id
         //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         // store.getState().users.
         // store.dispatch(userActions.actionUpdateOneUser({ id: user.id, field: 'socketId', value: socket.id }))



         const token = JSON.stringify(jwt.sign({ userId: user.id }, config.get('jwtSecret'), { expiresIn: '1h' }))

         const { messages, __v, ...clearedUser } = user._doc
         delete clearedUser.password

         let users = await User.find()
         if (!users) return emitError(socket, 404, 'reading user list error')
   
         const clearedUsers = users.map(user => {
            const { messages, __v, password, avatar, login, ...clearedUser } = user._doc
            return clearedUser
         })
   
         socket.broadcast.emit('players', clearedUsers)

         emitSuccess(socket, 200, 'Authorization procedure passed successfully', { token, clearedUser })
      } catch (e) {
         emitError(socket, 500, 'Something went wrong, try again')
      }
   })

   socket.on('registration request', async data => {
      console.log(`***user ${socket.id} Registration request`)
      try {
         const { login, password } = data

         let validationPassed = (validator.isEmail(login) && validator.isLength(password, { min: 6 })) || false
         if (!validationPassed) return emitError(socket, 400, 'Invalid type of credentials')

         const candidate = await User.findOne({ login })
         if (candidate) return emitError(socket, 409, 'User already exists')

         const hashedPassword = await bcrypt.hash(password, 12)
         const user = new User({ login, password: hashedPassword })

         userSocketRegistry[user.id] = socket.id

         await user.save()
         emitSuccess(socket, 201, 'User created successfully', user.id)
      } catch (e) {
         emitError(socket, 500, 'Something went wrong, try again')
      }
      //TODO emit to User List
   })

   socket.on('reconnect request', async data => {
      console.log(`***user ${socket.id} Reconnect request`)
      try {
         const decoded = jwt.verify(JSON.parse(data), config.get('jwtSecret'))

         const user = await User.findOne({ _id: decoded.userId })
         if (!user) return emitError(socket, 404, 'User not found')

         userSocketRegistry[user.id] = socket.id
         
         const { messages, __v, ...clearedUser } = user._doc
         delete clearedUser.password

         let users = await User.find()
         if (!users) return emitError(socket, 404, 'reading user list error')
   
         const clearedUsers = users.map(user => {
            const { messages, __v, password, avatar, login, ...clearedUser } = user._doc
            return clearedUser
         })
   
         socket.broadcast.emit('players', clearedUsers)

         const token = JSON.stringify(jwt.sign({ userId: user.id }, config.get('jwtSecret'), { expiresIn: '1h' }))

         emitSuccess(socket, 200, 'Authorization procedure passed successfully', { token, clearedUser })
      } catch (e) {
         emitError(socket, 500, 'Something went wrong, try again')
      }
   })

   //*=========================CHAT==============================

   socket.on('read all messages', async () => {
      console.log(`***user ${socket.id} Read messages`)
      try {
         const messages = await Message.find().populate('user', 'nickname')
         if (!messages) return emitError(socket, 404, 'User not found')
         socket.emit('messages', messages)
      } catch (e) {
         emitError(socket, 500, 'Something went wrong, try again')
      }
   })

   socket.on('post message', async data => {
      console.log(`***user ${socket.id} Post message`)
      try {
         const { user, message } = data
         const newMessage = new Message({ user, message })
         await newMessage.save()

         const id = newMessage._id
         const userMessage = await Message.findOne({ _id: id }).populate('user', 'nickname')

         socket.emit('new chat message', userMessage)
         socket.broadcast.emit('new chat message', userMessage)
         console.log('posted message sent back', userMessage)
      } catch (e) {
         emitError(socket, 500, 'Something went wrong, try again')
         console.log('new chat message broadcast error')
      }
   })

   //*=========================USER LIST============================
   socket.on('read all players', async () => {
      console.log(`***user ${socket.id} User list request`)
      try {
         let users = await User.find()
         if (!users) return emitError(socket, 404, 'reading user list error')

         const clearedUsers = users.map(user => {
            const { messages, __v, password, avatar, login, ...clearedUser } = user._doc
            return clearedUser
         })

         socket.emit('players', clearedUsers)
      } catch (e) {
         emitError(socket, 500, 'Something went wrong, try again')
      }
   })

//*========================= CHANGE STATUS ============================

socket.on('change status', async data => {
   console.log(`***user ${socket.id} changed status to ${data.status}`)
   try {

      await User.findOneAndUpdate({ _id: data.id }, { status: data.status })

      for (let key in userSocketRegistry) if (userSocketRegistry[key] === socket.id) userSocketRegistry[key] = null

      let users = await User.find()
      if (!users) return emitError(socket, 404, 'reading user list error')

      const clearedUsers = users.map(user => {
         const { messages, __v, password, avatar, login, ...clearedUser } = user._doc
         return clearedUser
      })

      socket.broadcast.emit('players', clearedUsers)

   } catch (e) {
      emitError(socket, 500, 'Something went wrong, try again')
   }
})


//*========================= GAME REQUEST ============================
socket.on('game request', async data => {
   console.log(`***user ${socket.id} requested game with ${data.opponent}`)
   // try {
      //TODO start game
//?? check if not self-invite
//?? check if both are free (games registry?)
//?? update both player statuses
//?? assign XO, define first turner(X)
//?? system messages?
//? validate next turn active field
//?? create new Game
//?? reply with score info
//?? reply with game info (combine?)


//TODO games registry
//? id -> status, players
//? finished -> remove
   //    await User.findOneAndUpdate({ _id: data.id }, { status: data.status })

   //    for (let key in userSocketRegistry) if (userSocketRegistry[key] === socket.id) userSocketRegistry[key] = null

   //    let users = await User.find()
   //    if (!users) return emitError(socket, 404, 'reading user list error')

   //    const clearedUsers = users.map(user => {
   //       const { messages, __v, password, avatar, login, ...clearedUser } = user._doc
   //       return clearedUser
   //    })

   //    socket.broadcast.emit('players', clearedUsers)

   // } catch (e) {
   //    emitError(socket, 500, 'Something went wrong, try again')
   // }
})

//TODO Turn event
//? find game
//?? validate turn
//? validate win
//? change turner
//? system messages
//? validate next turn active field
//? update Game
//? reply with game info

//TODO Game end
//? find game
//? flee event
//? system messages
//? update Game
//? reply with game info

//TODO check if i`m in game?
//? populate all Games by id
//? check if any of them active? (replace with game registry? -> will need reducer any way?)

}

module.exports = socketHandlers
