import socket from '../helpers/socket'

export const actionLogin = data => ({ type: 'LOG_IN', payload: data })

export const actionLogout = data => {
   socket.emit('change status', { status: 'OFFLINE', id: localStorage.userId })
   return { type: 'LOG_OUT', payload: data }
}
