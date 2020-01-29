import React, { useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import store from '../Redux-store'
import { actionLogout } from '../actions/authActions'
import { Sidenav } from './Sidenav'


export const NavBar = ({ appColor }) => {
   const history = useHistory()

   const logoutHandler = event => {
      event.preventDefault()
      localStorage.removeItem('userId')
      localStorage.removeItem('userToken')
      store.dispatch(actionLogout())
      history.push('/')
   }

   useEffect(() => {
      let elems = document.querySelectorAll('.sidenav')
      window.M.Sidenav.init(elems)
   }, [])

   const sideNavHandler = event => {
      event.preventDefault()
      let profile = document.getElementById('profile')
      window.M.Sidenav.getInstance(profile).open()
   }

   return (
      <nav>
         <div className={`nav-wrapper ${appColor}`} style={{ padding: '0 3rem' }}>
            <span className="brand-logo font-fam-mainheader">Strategic Tic-Tac-Toe</span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
               <li>
                  <NavLink to="/lobby" className="font-fam-tidy">
                     Lobby
                  </NavLink>
               </li>
               <li>
                  <NavLink to="/game" className="font-fam-tidy">
                     Game
                  </NavLink>
               </li>
               <li>
                  <NavLink to="/info" className="font-fam-tidy">
                     Rules
                  </NavLink>
               </li>
               <li>
                  <a
                     href="#!"
                     onClick={sideNavHandler}
                     className="sidenav-trigger show-on-large font-fam-tidy black-text"
                  >
                     UserName
                  </a>
               </li>
               <li>
                  <a href="/" onClick={logoutHandler} className="font-fam-tidy black-text">
                     Logout
                  </a>
               </li>
            </ul>
         </div>

         <Sidenav />
      </nav>
   )
}

//TODO add username?


