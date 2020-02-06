import SocketIOClient from 'socket.io-client'
import { actionUpdateGameState } from '../actions/gameActions'
import store from '../reducers/Redux-store'

const socket = SocketIOClient('http://localhost:5000')


socket.on('connect', () => console.log('Client socket id: ', socket.id))


//TODO test error
socket.on('requestError', reply => {
    window.M.toast({ html: reply.message, classes: 'rounded' })
    //? setLoading(false)
 })


 socket.on('game state', data => { store.dispatch(actionUpdateGameState(data)) })





//TODO move reconnect request here?

socket.on ('disconnect', () => console.log('Disconnected', socket.id))
//TODO need to clear something on disconnect? on disconnect - reconnect request?

export default socket