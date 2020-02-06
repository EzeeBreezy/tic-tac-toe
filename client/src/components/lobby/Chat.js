import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { Messages } from './Messages'
import { Loader } from '../Loader'
import socket from '../../helpers/socket'


export const Chat = () => {
   const [msgInpValue, setMsgInpValue] = useState('')

   const changeHandler = event => setMsgInpValue(event.target.value)


   //!!!!!!========socket stuff===========
   
   const [msgList, setMsgList] = useState([])

   useEffect(() => {
      socket.emit('read all messages', () => console.log('msg history request'))
      socket.on('messages', data => {
         setMsgList([...data])
         console.log('msg history received')
      })
   }, [])

   const sendMessage = () => {
      socket.emit('post message', { user: localStorage.userId, message: msgInpValue })
      setMsgInpValue('')
      console.log('msg sent')

      // socket.on('requestError', reply => {
      //    window.M.toast({ html: reply.message, classes: 'rounded' })
      // })
   }


   socket.on('new chat message', data => {
      console.log('new msg received: ', data)
      setMsgList([...msgList, data])
   })


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
                              className="btn-floating btn waves-effect waves cyan darken-3 hoverable"
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
