const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const config = require('config')
const mongoose = require('mongoose')
const socketHandlers = require('./handlers/socketHandlers')

const PORT = config.get('port') || 5000

async function start() {
   try {
      await mongoose.connect(config.get('mongoURI'), {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
         useFindAndModify: false
      })
      server.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
      io.on('connection', socketHandlers)
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

//TODO redux on back



//TODO asmer - pictures notimported - use multer, 

//TODO plan - move socket handlers to AC + thunk
//TODO plan - create socket/games reg store on back

