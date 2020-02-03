const Redux = require('redux')
const thunk = require('redux-thunk')
const usersReducer = require('./usersRegistry')
const game = require('./gameRegistry')


const reducers = Redux.combineReducers({
   games: game.gameRegistry,
   users: usersReducer.usersRegistry
})

const store = Redux.createStore(reducers, Redux.applyMiddleware(thunk.default))


module.exports = store
