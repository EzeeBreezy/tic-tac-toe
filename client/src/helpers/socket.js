import SocketIOClient from 'socket.io-client'

const socket = SocketIOClient('http://localhost:5000')


socket.on('connect', () => console.log('Client socket id: ', socket.id))

//TODO reconnect request?

socket.on ('disconnect', () => console.log('Disconnected', socket.id))
//TODO clear on disconnect? reconnect request?

export default socket