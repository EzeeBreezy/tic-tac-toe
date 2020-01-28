import React from 'react'
import { UserList } from '../components/lobby/UserList'
import { Chat } from '../components/lobby/Chat'

export const LobbyPage = () => {
   return (
      <>
         <div className="row">
            <div className="col s6">
               <UserList />
            </div>

            <div className="col s6">
            <Chat />
            </div>
         </div>
      </>
   )
}
