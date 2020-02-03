const Redux = require('redux')
const socket = require('./socketRegistry')
const game = require('./gameRegistry')


const reducers = Redux.combineReducers({
   games: game.gameRegistry,
   sockets: socket.socketRegistry
})

const store = Redux.createStore(reducers)

module.exports = store
