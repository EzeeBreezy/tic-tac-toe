import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { gameReducer } from './gameReducer'
import { userReducer } from './userReducer'

// import { composeWithDevTools } from 'redux-devtools-extension'
// import { applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'

const reducers = combineReducers({
   game: gameReducer,
   user: userReducer
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store
