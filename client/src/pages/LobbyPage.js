import React from 'react'
import { UserList } from '../components/lobby/UserList'
import { Chat } from '../components/lobby/Chat'

export const LobbyPage = () => {
   return (
      <>
         <div className="row">
            <div className="col">
               <UserList />
            </div>

            <div className="col">
            <Chat />
            </div>
         </div>
      </>
   )
}
