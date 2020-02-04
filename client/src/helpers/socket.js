import SocketIOClient from 'socket.io-client'

const socket = SocketIOClient('http://localhost:5000')


socket.on('connect', () => console.log('Client socket id: ', socket.id))

//TODO move reconnect request here?

socket.on ('disconnect', () => console.log('Disconnected', socket.id))
//TODO need to clear something?  on disconnect? on disconnect - reconnect request?

export default socket