import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { Messages } from './Messages'
import { Loader } from '../Loader'

   //!!!!!!
import socketIOClient from 'socket.io-client'
   //!!!!!!

export const Chat = () => {

   //!!!!!!

const socket = socketIOClient('http://localhost:5000')
socket.emit('read all messages', null)

const MSG = []

socket.on('messages', data => {
   console.log('message data: ', data)
   MSG.push(...data)
})
console.log('messages: ', MSG)
//!!!!


   const [msgInpValue, setMsgInpValue] = useState('')

   const changeHandler = event => setMsgInpValue(event.target.value)

   const sendMessage = () => {
      socket.emit('post message', {user: localStorage.userId, message: msgInpValue})
      setMsgInpValue('')
      //!!!!!!!!!!!!!!!!!
      socket.on('requestSuccess', reply => {
         window.M.toast({ html: reply.message, classes: 'rounded' })
      })
      socket.on('requestError', reply => {
         window.M.toast({ html: reply.message, classes: 'rounded' })
      })
      //!!!!!!!!!!!!!!!!!!!
   }

   return (
      <>
         <h1 className="font-fam-mainheader center-align cyan-text text-darken-2">Global chat</h1>
         <div className="divider grey accent-3"></div>
         <div style={{ height: '300px' }}>
            {MSG.length ? <Messages messages={MSG} /> : <Loader size={'big'}/>}
            //TODO fix messages || Loader
            {/* <Messages /> */}
         </div>
         <div className="divider grey accent-3"></div>
         <div className="row">
            <form className="col s12">
               <div className="row">
                  <div className="input-field col s12">
                     <i className="material-icons prefix">
                        <a className="btn-floating btn waves-effect waves cyan darken-3" onClick={sendMessage} disabled={!msgInpValue}>
                           <FontAwesomeIcon icon={faPen} />
                        </a>
                     </i>
                     <input id="icon_prefix" type="text" onChange={changeHandler} value={msgInpValue} />
                     <label htmlFor="icon_prefix">Type your message</label>
                  </div>
               </div>
            </form>
         </div>
      </>
   )
}

//TODO compMount - add event listener on ENTER (()=>onBTNclick()) // comp dismount -> destroy
