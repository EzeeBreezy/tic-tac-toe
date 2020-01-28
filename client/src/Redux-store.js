import { createStore, combineReducers } from 'redux'
import { loginReducer } from './reducers/loginReducer'
import { playersReducer } from './reducers/playersReducer'

const reducers = combineReducers({
   login: loginReducer,
   players: playersReducer
})

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
