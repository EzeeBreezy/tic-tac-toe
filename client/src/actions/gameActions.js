import socket from '../helpers/socket'

// export const actionTurn = data => ({ type: 'TURN', payload: data })

const actionUpdateGameState = data => ({ type: 'UPDATE_GAME_STATE', payload: data })


export const actionGameRequest = data => {
   socket.emit('game request', { player: localStorage.userId, opponent: data._id })
   return function(dispatch) {
      socket.on('game state', data => {
         console.log('gamestate data:', data)
         dispatch(actionUpdateGameState(data))
      })

      //TODO test error messages -> move out from action creators?
      socket.on('requestError', reply => {
         window.M.toast({ html: reply.message, classes: 'rounded' })
      })
   }
}
//TODO combine with game request?
export const actionTurn = data => {
    socket.emit('turn', { player: localStorage.userId, coords: data.coords, gameId: data.gameId })

    ({ type: 'TURN', payload: data })
} 

