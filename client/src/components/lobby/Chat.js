import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

export const Chat = () => {
   return (
      <>
         <h1 className="font-fam-mainheader center-align cyan-text text-darken-2">Global chat</h1>
         <div className="divider grey accent-3"></div>
         <div style={{ height: '350px' }}>
            <h3>messages</h3>
         </div>
         <div className="divider grey accent-3"></div>
         <div className="row">
            <form className="col s12">
               <div className="row">
                  <div className="input-field col s12">
                     <i className="material-icons prefix">
                        <a className="btn-floating btn waves-effect waves cyan darken-3">
                           <FontAwesomeIcon icon={faPen} />
                        </a>
                     </i>
                     <textarea id="icon_prefix2" className="materialize-textarea"></textarea>
                     <label htmlFor="icon_prefix2">Type your message</label>
                  </div>
               </div>
            </form>
         </div>
      </>
   )
}

//TODO compMount - add event listener on ENTER (()=>onBTNclick()) // comp dismount -> destroy
