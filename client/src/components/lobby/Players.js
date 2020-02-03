import React from 'react'
import socket from '../../helpers/socket'

const Player = ({ nickname, status, _id }) => {
   const startGame = () => {
      socket.emit('game request', { user: localStorage.userId, opponent: _id })
      console.log('game request sent', { user: localStorage.userId, opponent: _id })

      socket.on('start game', reply => {
         window.M.toast({ html: reply.message, classes: 'rounded' })
      })
      //TODO switch to GAME tab on startgame

      socket.on('requestError', reply => {
         window.M.toast({ html: reply.message, classes: 'rounded' })
      })
   }


   let statusColor =
      status === 'READY'
         ? 'green-text text-accent-3'
         : status === 'OFFLINE'
            ? 'deep-orange-text text-accent-3'
            : 'amber-text text-accent-3'

   return (
      <div className="row grey darken-2" style={{ height: '2.25rem', margin: '5px 10px 0 10px' }}>
         <div className="col s3 offset-s1 cyan-text font-fam-tidy" style={{ paddingTop: '5px' }}>
            {nickname}
         </div>
         <div className={`col s2 offset-s3 font-fam-mainheader ${statusColor}`} style={{ paddingTop: '5px' }}>
            {status}
         </div>
         <div className="col s2 offset-s1">
            <a className="btn-floating btn-small pulse orange darken-4" href="#!" onClick={startGame}>
               play
            </a>
         </div>
      </div>
   )
}

//TODO  statuses - ready/waiting/away/playing/offline

export const Players = ({ props }) => props.map(player => <Player {...player} key={player.id} />)
