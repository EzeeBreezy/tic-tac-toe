import React from 'react'
import { actionGameRequest } from '../../actions/gameActions'
import { connect } from 'react-redux'

const Player = ({ nickname, status, _id, offerGame }) => {
   const startGame = () => offerGame({ _id })

   //TODO switch to GAME tab on startgame
   //TODO exclude self
   //TODO make inactive while in game -> all buttons

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

//TODO  statuses - ready/away/playing/offline

const connected = connect(state => ({}), { offerGame: actionGameRequest })

const ConnectedPlayer = connected(Player)

//TODO connect all comps in one place

export const Players = ({ props }) => props.map(player => <ConnectedPlayer {...player} key={player.id} />)
