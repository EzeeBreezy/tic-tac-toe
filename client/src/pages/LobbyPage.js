import React from 'react'
import { PlayersList } from '../components/lobby/PlayersList'
import { Chat } from '../components/lobby/Chat'

export const LobbyPage = () => {
   return (
      <>
         <div className="row">
            <div className="col s6">
               <PlayersList />
            </div>

            <div className="col s6">
            <Chat />
            </div>
         </div>
      </>
   )
}
