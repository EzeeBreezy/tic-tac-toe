import React, { useState } from 'react'
import 'materialize-css'
import { useRoutes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import { Provider } from 'react-redux'
import store from './Redux-store'
import { actionLogin } from './actions/authActions'
import socketIOClient from 'socket.io-client'
import { randomAppColor } from './helpers/appColors' 


function App() {
   const [isAuthenticated, setAuthenticated] = useState(store.getState().login.isAuthenticated)
   store.subscribe(() => setAuthenticated(store.getState().login.isAuthenticated))
   const routes = useRoutes(isAuthenticated)
   const socket = socketIOClient('http://localhost:5000')
   socket.on('connection established', data => console.log(data))
   // const socket = socketIOClient("http://localhost:5000/api/socket")
   if (localStorage.userToken) {
      socket.emit('reconnect request', localStorage.userToken)
   }
   socket.on('requestSuccess', reply => {
      if (reply.status === 200) {
         store.dispatch(actionLogin())
         localStorage.userToken = reply.data.token
         localStorage.userId = reply.data.userId
      }
   })
   
   socket.on('requestError', data => console.log(data))
   //TODO change request error for reconnect... do i need it?
   // socket.emit('authorization request', { login: 'blabla', password: 'blah' })
   // socket.emit('authorization request', { login: 'test4@test.com', password: 'testtest' })

   return (
      <Provider store={store}>
         <Router>
            <header>{isAuthenticated && <NavBar appColor={randomAppColor} />}</header>
            <main className="container">{routes}</main>
            <Footer appColor={randomAppColor} />
         </Router>
      </Provider>
   )
}

export default App

//TODO redux connect all components

//TODO check all console logs, commented lines, fonts
