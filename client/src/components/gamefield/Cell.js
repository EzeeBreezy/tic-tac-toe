import React from 'react'
import picX from '../../assets/images/X.png'
import picO from '../../assets/images/O.png'
import { actionTurn } from '../../actions/gameActions'
import { connect } from 'react-redux'
import socket from '../../helpers/socket'


function Cell({sign, coords, gameId, player, turn}) {
   let pic = sign === 'x' ? picX : picO

   const clickHandler = () => {
      socket.emit('turn', { player: player, coords, gameId })
      // turn(coords)
   }

   return (
      <div style={{ width: '60px', height: '60px', paddingTop: '9px'}} onClick={clickHandler}>
         {sign !== 'e' && <img src={pic} width="42px"/>}
      </div>
   )
}

const connected = connect(state => ({ gameId: state.game._id, player: state.user._id}), { turn: actionTurn })

export const ConnectedCell = connected(Cell)