import React from 'react'
import 'materialize-css'
import { useRoutes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import socketIOClient from "socket.io-client"

function App() {
   const routes = useRoutes(true)
   const socket = socketIOClient("http://localhost:5000")
   // const socket = socketIOClient("http://localhost:5000/api/socket")


   socket.on('connection established', data => console.log(data))
   socket.on('requestError', data => console.log(data))
   socket.on('success', data => console.log(data))
   socket.emit('authorization request', { login: 'blabla', password: 'blah' })


   //  TODO add check to routes.js - game cant be switched to lobby if inProgress, lobby cant be switched to game if there is no game
   // TODO {isAuth && <NavBar />}
   // TODO create random nav-footer color class object
   return (
      <Router>
         <header>
            <NavBar />
         </header>
         <main className="container">{routes}</main>
         <Footer />
      </Router>
   )
}

export default App
