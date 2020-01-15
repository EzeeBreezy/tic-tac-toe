import React from 'react'
import 'materialize-css'
import { useRoutes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'

function App() {
   const routes = useRoutes(false)
   //  TODO add check to routes.js - game cant be switched to lobby if inProgress, lobby cant be switched to game if there is no game
   // TODO {isAuth && <NavBar />}
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
