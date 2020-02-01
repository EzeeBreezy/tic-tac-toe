import React from 'react'

const Message = ({ user, date, message }) => (
   <div className="row">
      <div className="col s12">
         <i className="grey-text text-darken-1" style={{fontSize: '0.75rem'}}>{new Date(date).toLocaleString('ru-RU', { hour12: false })}: </i>
         <strong className={user._id === localStorage.userId ? 'red-text font-fam-tidy' : 'blue-text font-fam-tidy'}>
            {user.nickname} :{' '}
         </strong>
         <span className="font-fam-tidy">{message}</span>
      </div>
   </div>
)


export const Messages = ({ messages }) => messages.map(message => <Message {...message} key={message._id} />)
