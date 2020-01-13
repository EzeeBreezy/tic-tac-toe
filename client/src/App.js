import React from 'react'
import 'materialize-css'
import { useRoutes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
   const routes = useRoutes(false)
  //  TODO add check to routes.js - game cant be switched to lobby if inporgress, lobby cant be switched to game if there is no game
   return (
      <Router>
         <div className="container">{routes}</div>
      </Router>
   )
}

export default App

//TODO change favicon
