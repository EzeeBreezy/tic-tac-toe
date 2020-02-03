import React, { useState, useEffect } from 'react'
import { Loader } from '../Loader'
import { Players } from './Players'
import socket from '../../helpers/socket'

export const PlayersList = () => {
   //!!!!!!========socket stuff===========

   const [plrList, setPlrList] = useState([
      { nickname: 'nickname', status: 'ONLINE' },
      { nickname: 'nickname', status: 'ONLINE' },
      { nickname: 'nickname', status: 'ONLINE' }
   ])

   useEffect(() => {
      socket.emit('read all players', () => console.log('players list request'))
      socket.on('players', data => {
         setPlrList([...data])
         console.log('players list received')
      })
   }, [])


   //  socket.on('new chat message', data => {
   //     console.log('new msg received: ', data)
   //     setMsgList([...msgList, data])
   //  })

   //!!!!!!!!!!!!!!!!!!!========end socket stuff===========

   return (
      <div className="row">
         <div className="col s12">
            <h1 className="font-fam-mainheader center-align cyan-text text-darken-2">Players</h1>
            <div className="divider grey accent-3"></div>
            <div className='y-scroll' style={{ height: '380px' }}>
               {plrList.length ? <Players props={plrList} /> : <Loader size={'big'} />}
            </div>
            <div className="divider grey accent-3"></div>
         </div>
      </div>
   )
}

//TODO use className='pulse'

//TODO search

//TODO keys for Players
