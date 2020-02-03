import React, { useState, useEffect } from 'react'
import { actionLogin } from '../actions/authActions'
import { connect } from 'react-redux'
import { Loader } from '../components/Loader'
import socket from '../helpers/socket'


function AuthPage ({ loginAction }) {
   const [form, setForm] = useState({
      login: '',
      password: ''
   })

   const [isLoading, setLoading] = useState(false)

   const changeHandler = event => {
      setForm({ ...form, [event.target.name]: event.target.value })
   }

   const loginHandler = () => {
      socket.emit('authorization request', form)
      setLoading(true)

      socket.on('requestSuccess', reply => {
         if (reply.status === 200) {
            loginAction(reply.data.clearedUser)
            localStorage.userToken = reply.data.token
            localStorage.userId = reply.data.clearedUser._id
            setLoading(false)
         }
      })

      socket.on('requestError', reply => {
         window.M.toast({ html: reply.message, classes: 'rounded' })
         setLoading(false)
      })
   }

   const registerHandler = () => {
      socket.emit('registration request', form)
      setLoading(true)

      socket.on('requestSuccess', reply => {
         window.M.toast({ html: reply.message, classes: 'rounded' })
         setLoading(false)
      })
      
      socket.on('requestError', reply => {
         window.M.toast({ html: reply.message, classes: 'rounded' })
         setLoading(false)
      })
   }

   useEffect(() => {
      window.M.updateTextFields()
      if (localStorage.userToken) {
         socket.emit('reconnect request', localStorage.userToken)
      }
      socket.on('requestSuccess', reply => {
         if (reply.status === 200) {
            loginAction(reply.data.clearedUser)
            localStorage.userToken = reply.data.token
            localStorage.userId = reply.data.clearedUser._id
         }
      })
   }, [])


   return (
      <div className="row">
         <div className="col s7 offset-s3">
            <h1 className="light-blue-text text-darken-3 font-fam-mainheader">Strategic Tic-Tac-Toe</h1>
            <div className="card  blue-grey darken-3 hoverable">
               <div className="card-content white-text">
                  <span className="card-title font-fam-tidy">Authorization</span>
                  <div>
                     <div className="input-field">
                        <input
                           placeholder="Enter email"
                           id="login"
                           type="text"
                           name="login"
                           className="font-fam-tidy white-text"
                           value={form.login}
                           onChange={changeHandler}
                        />
                        <label htmlFor="login" className="font-fam-tidy">
                           Email
                        </label>
                     </div>
                     <div className="input-field">
                        <input
                           placeholder="Enter password"
                           id="password"
                           type="password"
                           name="password"
                           className="font-fam-tidy white-text"
                           value={form.password}
                           onChange={changeHandler}
                        />
                        <label htmlFor="password" className="font-fam-tidy">
                           Password
                        </label>
                     </div>
                  </div>
               </div>
               <div className="card-action">
                  <div className="row">
                     <div className="col s2">
                        <button
                           className="btn blue darken-2 font-fam-mainheader hoverable"
                           style={{ marginRight: 10, width: '100%' }}
                           disabled={isLoading}
                           onClick={loginHandler}
                        >
                           {isLoading ? <Loader size={'small'} /> : 'Login'}
                        </button>
                     </div>
                     <div className="col s2">
                        <button
                           className="btn indigo accent-1 black-text font-fam-tidy hoverable"
                           onClick={registerHandler}
                           disabled={isLoading}
                        >
                           {isLoading ? <Loader size={'small'} /> : 'Register'}
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}


const connected = connect(state => ({}), { loginAction: actionLogin })

export const ConnectedAuthPage = connected(AuthPage)

//TODO setTimeout to avoid endless server response waiting time
