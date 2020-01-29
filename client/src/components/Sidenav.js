import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons'

export const Sidenav = () => {
   return (
      <ul id="profile" className="sidenav">
         <li>
            <div className="user-view">
               <div href="#!">
                  <img className="circle" src="#!" />
                  <a className="btn-floating btn-small waves-effect waves-light red" >
                     <i className="material-icons" style={{ fontSize: '0.9rem' }}>
                        <FontAwesomeIcon icon={faPlus} />
                     </i>
                  </a>
               </div>
               <div>
                  <span className="light-blue-text text-darken-4 font-fam-mainheader">User Name</span>
                  <a className="btn-floating btn-small waves-effect waves-light red" href="#!">
                     <i className="material-icons" style={{ fontSize: '0.9rem' }}>
                        <FontAwesomeIcon icon={faPen} />
                     </i>
                  </a>
               </div>
               <a href="#!">
                  <span className="light-blue-text text-darken-2 font-fam-mainheader">account@email.com</span>
               </a>
            </div>
         </li>
         <li>
            <div className="divider grey accent-3"></div>
         </li>
         <li>
            <a className="subheader grey-text text-darken-2 font-fam-mainheader">Player statistic</a>
         </li>
         <li>
            <div className="divider grey accent-3"></div>
         </li>
         <li>
            <a className="subheader font-fam-mainheader black-text" href="#!">
               Winrate:
            </a>
         </li>
         <li>
            <a className="subheader font-fam-mainheader black-text" href="#!">
               Games played:
            </a>
         </li>
         <li>
            <a className="subheader font-fam-mainheader black-text" href="#!">
               Wins:
            </a>
         </li>
         <li>
            <a className="subheader font-fam-mainheader black-text" href="#!">
               Loses:
            </a>
         </li>
         <li>
            <a className="subheader font-fam-mainheader black-text" href="#!">
               Draws:
            </a>
         </li>
         <li>
            <a className="subheader font-fam-mainheader black-text" href="#!">
               Last Game result:
            </a>
         </li>
      </ul>
   )
}
