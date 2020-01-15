  
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
         <div className="nav-wrapper  light-blue darken-2" style={{ padding: '0 3rem' }}>
            <span className="brand-logo font-fam-mainheader">Strategic Tic-Tac-Toe</span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
               <li>
                  <NavLink to="/lobby" className="font-fam-tidy">Lobby</NavLink>
               </li>
               <li>
                  <NavLink to="/game" className="font-fam-tidy">Game</NavLink>
               </li>
               <li>
                  <NavLink to="/info" className="font-fam-tidy">Rules</NavLink>
               </li>
               <li>
                  <NavLink to="/profile" className="font-fam-tidy">Profile</NavLink>
               </li>
               <li>
                  <a href="/" 
                  onClick={logoutHandler}
                  className="font-fam-tidy"
                  >
                     Logout
                  </a>
               </li>
            </ul>
         </div>
      </nav>
   )
}