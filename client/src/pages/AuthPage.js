import React, { useState, useEffect } from 'react'
// import { connect } from 'react-redux'
//TODO remove
import { actionLogin } from '../actions/authActions'
import store from '../Redux-store'

//!!!!!!
import socketIOClient from 'socket.io-client'
//!!!!

export const AuthPage = () => {
   const [form, setForm] = useState({
      login: '',
      password: ''
   })

   const changeHandler = event => {
      setForm({ ...form, [event.target.name]: event.target.value })
   }

   const loginHandler = () => {
      const socket = socketIOClient('http://localhost:5000')
      socket.emit('authorization request', form)
      socket.on('requestSuccess', reply => {
         if (reply.status === 200) {
            //!!!!!!!!!!
            // becomeLoggedIn()
            //TODO remove
            //!!!!!!!!!
            store.dispatch(actionLogin())
            localStorage.userToken = reply.data.token
            localStorage.userId = reply.data.userId
         }
      })
      socket.on('requestError', reply => {
         window.M.toast({ html: reply.message, classes: 'rounded' })
      })
   }

   const registerHandler = () => {
      const socket = socketIOClient('http://localhost:5000')
      socket.emit('registration request', form)
      socket.on('requestSuccess', reply => {
         window.M.toast({ html: reply.message, classes: 'rounded' })
      })
      socket.on('requestError', reply => {
         window.M.toast({ html: reply.message, classes: 'rounded' })
      })
   }

   useEffect(() => {
      window.M.updateTextFields()
   }, [])

   return (
      <div className="row">
         <div className="col s7 offset-s3">
            <h1 className="light-blue-text text-darken-3 font-fam-mainheader">Strategic Tic-Tac-Toe</h1>
            <div className="card  blue-grey darken-3">
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
                  <button
                     className="btn blue darken-2 font-fam-mainheader"
                     style={{ marginRight: 10 }}
                     // disabled={loading}
                     onClick={loginHandler}
                  >
                     Login
                  </button>
                  <button
                     className="btn indigo accent-1 black-text font-fam-tidy"
                     onClick={registerHandler}
                     // disabled={loading}
                  >
                     Register
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}

// const connector = connect(state => ({ isAuthentincated: state.login.isAuthenticated }), {
//    becomeLoggedIn: actionLogin
//    // becomeLoggedOut: actionLogout
//    //TODO do i need logout here? NavBar, hah?
//    //TODO do i need mapStateToProps here?
// })

// export const ConnectedAuthPage = connector(AuthPage)
