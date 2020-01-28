import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

export const Chat = () => {
   return (
      <>
         <h1>chat</h1>
         <h3>messages</h3>
         <div className="row">
            <form className="col s12">
               <div className="row">
                  <div className="input-field col s6">
                     <i className="material-icons prefix">
                        <a class="btn-floating btn waves-effect waves-light cyan darken-3">
                           <FontAwesomeIcon icon={faPen} />
                        </a>
                     </i>
                     <textarea id="icon_prefix2" className="materialize-textarea"></textarea>
                     <label for="icon_prefix2">Type your message</label>
                  </div>
               </div>
            </form>
         </div>
         <h3>send button</h3>
      </>
   )
}
