import React from 'react'

const Player = ({ nickname, status, id }) => {
   //  const startGame = () => {
   //     socket.emit('game request', { user: localStorage.userId, opponent: '' })
   //     console.log('game request sent')

   //     socket.on('requestError', reply => {
   //        window.M.toast({ html: reply.message, classes: 'rounded' })
   //     })
   //  }
   return (
      <div className="row grey darken-2" style={{ height: '2.25rem', margin: '5px 10px 0 10px'}}>
         <div className="col s3 offset-s1 cyan-text font-fam-tidy" style={{ paddingTop: '5px' }}>
            {nickname}
         </div>
         <div className="col s2 offset-s3 white-text font-fam-mainheader" style={{ paddingTop: '5px' }}>
            {status}
         </div>
         <div className="col s2 offset-s1">
            <a className="btn-floating btn-small pulse orange darken-4">play</a>
         </div>
      </div>
   )
}

//TODO  statuses - ready/waiting/away/playing/offline

export const Players = ({ props }) => props.map(player => <Player {...player} />)
