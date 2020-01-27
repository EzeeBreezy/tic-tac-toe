import React, { useState } from 'react'
import 'materialize-css'
import { useRoutes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import { Provider } from 'react-redux'
import store from './Redux-store'
import socketIOClient from 'socket.io-client'

function App() {
   const [isAuthenticated, setAuthenticated] = useState(store.getState().login.isAuthenticated)
   store.subscribe(() => setAuthenticated(store.getState().login.isAuthenticated))
   const routes = useRoutes(isAuthenticated)
   const socket = socketIOClient('http://localhost:5000')
   // const socket = socketIOClient("http://localhost:5000/api/socket")

   socket.on('connection established', data => console.log(data))
   socket.on('requestError', data => console.log(data))
   socket.on('requestSuccess', data => console.log(data))
   // socket.emit('authorization request', { login: 'blabla', password: 'blah' })
   // socket.emit('authorization request', { login: 'test4@test.com', password: 'testtest' })

   //  TODO add check to routes.js - game cant be switched to lobby if inProgress, lobby cant be switched to game if there is no game
   // TODO {isAuth && <NavBar />}
   // TODO create random nav-footer color class object
   return (
      <Provider store={store}>
         <Router>
            <header>{isAuthenticated && <NavBar />}</header>
            <main className="container">{routes}</main>
            <Footer />
         </Router>
      </Provider>
   )
}

export default App
