import { createStore, combineReducers } from 'redux'
import { gameReducer } from './reducers/gameReducer'
import { userReducer } from './reducers/userReducer'

const reducers = combineReducers({
   game: gameReducer,
   user: userReducer
})

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
