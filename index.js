const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const config = require('config')
const mongoose = require('mongoose')

const PORT = config.get('port') || 5000

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

// io.on('connection', (socket) => {
//     console.log(socket)
// })


//TODO telegram bot?
//TODO chat?
//TODO emotions?
