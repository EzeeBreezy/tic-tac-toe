import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

export const ProfilePage = () => {
   return (
      <div className="row">
         <div className="col s6">
            <h2>User info</h2>
            <img src="#!" width="300px" /> <br/>
            <span>Nickname</span>
            <a className="btn-floating btn-large waves-effect waves-light red">
               <i className="material-icons">
                  <FontAwesomeIcon icon={faPen} />
               </i>
            </a>
            <h3>email</h3>
         </div>
         <div className="col s6">
            <h2>Winrate</h2>
            <h3>Games played</h3>
            <h3>Wins</h3>
            <h3>Loses</h3>
            <h3>Draws</h3>
            <h3>Last Game?</h3>
         </div>
      </div>
   )
}


//TODO sidenav?