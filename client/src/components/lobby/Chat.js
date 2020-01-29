import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { Messages } from './Messages'
import { Loader } from '../Loader'

//!!!!!! ========socket stuff===========
import socketIOClient from 'socket.io-client'
//!!!!!!========end socket stuff===========

export const Chat = () => {
   const [msgInpValue, setMsgInpValue] = useState('')

   const changeHandler = event => setMsgInpValue(event.target.value)


   //!!!!!!========socket stuff===========
   const socket = socketIOClient('http://localhost:5000')
   socket.emit('read all messages')

   const [msgList, setMsgList] = useState([])

   useEffect(() => {
      socket.on('messages', data => {
         setMsgList([...data])
      })
   }, [])

   const sendMessage = () => {
      socket.emit('post message', { user: localStorage.userId, message: msgInpValue })
      setMsgInpValue('')

      // window.M.updateTextFields()
      //TODO update text field after send
      // useEffect(() => {
      //    window.M.updateTextFields()
      // }, [])

      socket.on('requestError', reply => {
         window.M.toast({ html: reply.message, classes: 'rounded' })
      })
   }

   useEffect(() => {
      socket.on('new chat message', data => {
         setMsgList([...msgList, data])
      })
   }, [msgList])

   //!!!!!!!!!!!!!!!!!!!========end socket stuff===========

   useEffect(()=> {
      document.getElementById('y-scroll-1').lastChild.scrollIntoView(true)
   }, [msgList])

   return (
      <div className="row">
         <div className="col s12">
            <h1 className="font-fam-mainheader center-align cyan-text text-darken-2">Global chat</h1>
            <div className="divider grey accent-3"></div>
            <div id='y-scroll-1' className="y-scroll" style={{ height: '320px' }}>
               {msgList.length ? <Messages messages={msgList} /> : <Loader size={'big'} />}
            </div>
            <div className="divider grey accent-3"></div>
            <div className="row">
               <form className="col s12">
                  <div className="row">
                     <div className="input-field col s12">
                        <i className="material-icons prefix">
                           <a
                              className="btn-floating btn waves-effect waves cyan darken-3"
                              onClick={sendMessage}
                              disabled={!msgInpValue}
                           >
                              <FontAwesomeIcon icon={faPen} />
                           </a>
                        </i>
                        <input id="icon_prefix" type="text" onChange={changeHandler} value={msgInpValue} />
                        <label htmlFor="icon_prefix">Type your message</label>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </div>
   )
}

//TODO compMount - add event listener on ENTER (()=>onBTNclick()) // comp dismount -> destroy

//TODO 'enter' listener for chat
