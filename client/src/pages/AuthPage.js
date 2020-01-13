import React from 'react'

export const AuthPage = () => {
   return (
      <div className="row">
         <div className="col s6 offset-s3">
            <h1>Strategic Tic-Tac-Toe</h1>
            <div className="card blue darken-1">
               <div className="card-content white-text">
                  <span className="card-title">Authorization</span>
                  <div>
                     <div className="input-field">
                        <input
                           placeholder="Enter login"
                           id="login"
                           type="text"
                           name="login"
                           className="yellow-input"
                           // value={form.login}
                           // onChange={changeHandler}
                        />
                        <label htmlFor="login">Login</label>
                     </div>
                     <div className="input-field">
                        <input
                           placeholder="Enter password"
                           id="password"
                           type="password"
                           name="password"
                           className="yellow-input"
                           // value={form.password}
                           // onChange={changeHandler}
                        />
                        <label htmlFor="password">Password</label>
                     </div>
                  </div>
               </div>
               <div className="card-action">
                  <button
                     className="btn yellow darken-4"
                     style={{ marginRight: 10 }}
                     // disabled={loading}
                     // onClick={loginHandler}
                  >
                     Login
                  </button>
                  <button
                     className="btn grey lightne-1 black-text"
                     // onClick={registerHandler}
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
