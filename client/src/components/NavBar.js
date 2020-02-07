import React, { useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { actionLogout } from '../actions/authActions'
import { connect } from 'react-redux'
import { ConnectedSidenav as Sidenav } from './Sidenav'



function NavBar({ appColor, nickname, logOut, game }) {
   const history = useHistory()

   const logoutHandler = event => {
      event.preventDefault()
      logOut()
      localStorage.removeItem('userId')
      localStorage.removeItem('userToken')
      history.push('/')
   }

   useEffect(() => {
      let elems = document.querySelectorAll('.sidenav')
      window.M.Sidenav.init(elems)
   }, [])

   let activeLink

   useEffect(() => {

      if (game) {
         history.push('/game')
         activeLink = "font-fam-tidy"
      } else {
         history.push('/lobby')
         activeLink = "font-fam-tidy grey-text disabled-link"
      }
   }, [game])

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
                  <NavLink to="/game" className={game ? "font-fam-tidy" : "font-fam-tidy grey-text disabled-link"}>
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
                     {nickname}
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

const connected = connect(state => ({ nickname: state.user.nickname, game: state.game._id }), { logOut: actionLogout })

export const ConnectedNavBar = connected(NavBar)


//TODO change game id to state.user.currentGame =-> check if its not affect game/lobby switched