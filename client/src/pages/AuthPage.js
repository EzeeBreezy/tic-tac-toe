import React from 'react'

export const AuthPage = () => {
   return (
      <div className="row">
         <div className="col s6 offset-s3">
            <h1 className="light-blue-text text-darken-2 font-fam-mainheader">Strategic Tic-Tac-Toe</h1>
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
                           className="yellow-input font-fam-tidy"
                           // value={form.login}
                           // onChange={changeHandler}
                        />
                        <label htmlFor="login" className="font-fam-tidy">Email</label>
                     </div>
                     <div className="input-field">
                        <input
                           placeholder="Enter password"
                           id="password"
                           type="password"
                           name="password"
                           className="yellow-input font-fam-tidy"
                           // value={form.password}
                           // onChange={changeHandler}
                        />
                        <label htmlFor="password" className="font-fam-tidy">Password</label>
                     </div>
                  </div>
               </div>
               <div className="card-action">
                  <button
                     className="btn blue darken-2 font-fam-mainheader"
                     style={{ marginRight: 10 }}
                     // disabled={loading}
                     // onClick={loginHandler}
                  >
                     Login
                  </button>
                  <button
                     className="btn indigo accent-1 black-text font-fam-tidy"
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
