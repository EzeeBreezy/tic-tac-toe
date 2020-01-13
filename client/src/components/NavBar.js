  
import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
// import { AuthContext } from '../context/AuthContext'

export const NavBar = () => {
//    const auth = useContext(AuthContext)
   const history = useHistory()
   const logoutHandler = event => {
      event.preventDefault()
    //   auth.logout()
      history.push('/')
   }
   return (
      <nav>
         <div className="nav-wrapper teal darken-1" style={{ padding: '0 3rem' }}>
            <span className="brand-logo">Strategic Tic-Tac-Toe</span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
               <li>
                  <NavLink to="/lobby">Lobby</NavLink>
               </li>
               <li>
                  <NavLink to="/game">Game</NavLink>
               </li>
               <li>
                  <NavLink to="/info">Rules</NavLink>
               </li>
               <li>
                  <NavLink to="/profile">Profile</NavLink>
               </li>
               <li>
                  <a href="/" onClick={logoutHandler}>
                     Logout
                  </a>
               </li>
            </ul>
         </div>
      </nav>
   )
}