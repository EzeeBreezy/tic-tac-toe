const User = require('../models/User')
const Game = require('../models/Game')
const Message = require('../models/Message')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const { validateTurn } = require('../helpers/turnValidator')
const { validateWin } = require('../helpers/winValidator')
// const store = require('../reducers/Redux-store')
// const userActions = require('../actions/userActions')

const emitError = (socket, statusCode, msg) => socket.emit('requestError', { status: statusCode, message: msg })
const emitSuccess = (socket, statusCode, msg, data = null) =>
   socket.emit('requestSuccess', { status: statusCode, message: msg, data })

// store.subscribe(() => console.log(store.getState()))

const userSocketRegistry = {}
const gamesRegistry = {}

;(async () => {
   try {
      let users = await User.find()
      users.map(user => (userSocketRegistry[user._doc._id] = null))

      let games = await Game.find()
      games.map(game => {
         if (game._doc.winner === 'IN_PROGRESS')
            gamesRegistry[game._doc._id] = {
               playerX: game._doc.playerX,
               playerO: game._doc.playerO
            }
      })
   } catch (e) {
      console.log('***====could not update registry =====***')
   }

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

         console.log('ID:', id)
         await User.findOneAndUpdate({ _id: id }, { status: 'OFFLINE' })

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

         let user = await User.findOneAndUpdate({ login }, { status: 'READY' })
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

   //*========================= GAME ============================
   socket.on('game request', async data => {
      console.log(`***user ${socket.id} game request`)
      try {
         const { player, opponent } = data

         //TODO it does not work
         if (Object.values(gamesRegistry).includes(opponent)) return emitError(socket, 500, 'Player already in game')

         await User.updateMany({ $or: [{ _id: player }, { _id: opponent }] }, { status: 'PLAYING' })
         //TODO emit statuses update then
         //TODO save current game id in User and send on Front

         const game = new Game({})
         game.initNewGame(player, opponent)

         await game.save()

         gamesRegistry[game._id] = {
            playerX: game.playerX,
            playerO: game.playerO
         }
         console.log(gamesRegistry)
         //?? system messages?
         //?? reply with score info
         socket.emit('game state', game._doc)
         socket.broadcast.to(userSocketRegistry[opponent]).emit('game state', game._doc)
      } catch (e) {
         emitError(socket, 500, 'Something went wrong, try again')
      }

      //TODO games registry
      //? id -> status, players
      //? finished -> remove
   })

   socket.on('flee', async data => {
      console.log(`***user ${socket.id} flee request`)
      try {
         // const { player, opponent } = data
         //TODO playing check does not work so far(something with registry)
         // if (Object.values(gamesRegistry).includes(opponent)) return emitError(socket, 500, 'Player already in game')
         //TODO check if opponent still online in registry
         // await User.updateMany({ $or: [{ _id: player }, { _id: opponent }] }, { status: 'PLAYING' })
         //TODO emit statuses update then
         // await game.save()
         // gamesRegistry[game._id] = {
         //    playerX: game.playerX,
         //    playerO: game.playerO
         // }
         // //?? system messages?
         // //?? reply with score info
         // socket.emit('game state', game._doc)
         // socket.broadcast.to(userSocketRegistry[opponent]).emit('game state', game._doc)
      } catch (e) {
         // emitError(socket, 500, 'Something went wrong, try again')
      }
   })

   socket.on('turn', async data => {
      console.log(`***user ${socket.id} turn request`)
      try {
         const { player, coords, gameId } = data
         console.log(player, coords)
         const game = await Game.findOne({ _id: gameId })
         if (!game) return emitError(socket, 500, 'Game not found')

         // console.log(game.boardState)

         //check if turn was valid
         let allowedTurner = game.nextTurn == 'x' ? `${game.playerX}` : `${game.playerO}`

         console.log(allowedTurner, game.nextTurn)

         if (!validateTurn(player, allowedTurner, coords, game.boardState, game.bigField))
            return emitError(socket, 500, 'Invalid turn')
         // console.log('passed turnval', game.boardState)
         // make a move
         game.boardState[coords[0]][coords[1]][coords[2]][coords[3]] = game.nextTurn
         // console.log('made a move', game.boardState)
         //inner field - validator will replace all 'a' with 'e'
         for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++) {
               game.bigField[i][j] = validateWin(game.boardState[i][j])
            }
            // console.log('passed inner', game.bigField)
         //outer field
         const winner = validateWin(game.bigField, game.nextTurn)
         if (winner == game.nextTurn) {
            winner == 'x' ? game.winner = game.playerX : game.winner = game.playerO
         }
         // console.log('passed outer', winner)
         //set allowed inner fields
         if (game.bigField[coords[2]][coords[3]] != 'e') {
            for (let i = 0; i <= 2; i++)
               for (let j = 0; j <= 2; j++) if (game.bigField[i][j] == 'e') game.bigField[i][j] = 'a'
         } else game.bigField[coords[2]][coords[3]] = 'a'
         // console.log('passed allower')
         //change turner
         game.nextTurn == 'x' ? game.nextTurn = 'o' : game.nextTurn = 'x'

         await Game.replaceOne({ _id: game.id }, { ...game._doc })

         // console.log('after save', game.boardState)

         //?? system messages?


         let opponent = game.playerX
         if (player == game.playerX) opponent = game.playerO

         // player === game.playerX ? game.playerO : game.playerX
         //    gamesRegistry[game.id].playerX === player ? gamesRegistry[game.id].playerO : gamesRegistry[game.id].playerX

         console.log(player == game.playerX)
            console.log(opponent)
            console.log('opponent socket', userSocketRegistry[opponent])
            console.log('sockets', userSocketRegistry)

         socket.emit('game state', game)
         socket.to(`${userSocketRegistry[opponent]}`).emit('game state', game)
         // socket.broadcast.to(userSocketRegistry[opponent]).emit('game state', game)
      } catch (e) {
         emitError(socket, 500, 'Something went wrong, try again')
      }
   })

   //TODO Game end
   //? find game
   //? flee event
   //? system messages
   //? update Game
   //? reply with game info

   //TODO check if i`m in game event?? -> use in reconnect and auth
   //? read from user
}


//TODO system messages:
//? Player (XO) made his move, now turn belogns to (XO)
//? (XO) won. Game over
//? Game started. Move belongs to X

module.exports = socketHandlers
