import { createStore, combineReducers } from 'redux'
import { gameReducer } from './gameReducer'
import { userReducer } from './userReducer'

// import { composeWithDevTools } from 'redux-devtools-extension'
// import { applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'

const reducers = combineReducers({
   game: gameReducer,
   user: userReducer
})

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
