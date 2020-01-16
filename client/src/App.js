import React from 'react'
import 'materialize-css'
import { useRoutes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import socketIOClient from "socket.io-client"

function App() {
   const routes = useRoutes(false)
   const socket = socketIOClient("http://127.0.0.1:5000")

   socket.on('successfully connected with user', data => console.log(data))
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
