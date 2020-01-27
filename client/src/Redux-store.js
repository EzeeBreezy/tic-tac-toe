import { createStore, combineReducers } from 'redux'
import { loginReducer } from './reducers/loginReducer'

let promiseReducer = (state, action) => {
   if (state === undefined) return {}
   return state
}

const reducers = combineReducers({
   login: loginReducer,
   promise: promiseReducer
})

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
