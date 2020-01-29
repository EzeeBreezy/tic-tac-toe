import React from 'react'

const Message = ({ user, date, message }) => (
   <div className="row">
      <div className="col s12">
         <i>{date}//</i>
         <strong className={user._id === localStorage.userId ? 'red-text' : 'blue-text'}>{user.nickname} : </strong> {message}
      </div>
   </div>
)

export const Messages = (messages) =>
   messages.map(message => <Message props={message} key={message._id} />)
