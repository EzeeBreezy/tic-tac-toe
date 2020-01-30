import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faFistRaised, faHandshake } from '@fortawesome/free-solid-svg-icons'

export const Score = () => {
   return (
      <>
         <div className="row">
            <div className="col s4 center-align">
               <img src="#!" />
               <h4 className="font-fam-mainheader">Own name</h4>
               <img src="./X.png" width="100px" />
            </div>

            <div className="col s4 center-align valign-wrapper">
               <img src="./vs.png" width="150px" />
            </div>

            <div className="col s4 center-align">
               <h4 className="font-fam-mainheader">Opponent Name</h4>
               <img src="#!" /> <br/>
               <img src="./O.png" width="100px" />
            </div>
         </div>

         <div className="row">
            <div className="col">
               <div className="divider grey accent-3"></div>
               <div className="font-fam-tidy" style={{ height: '80px' }}>System messages: turn/winner/flee/draw/surrender offered</div>
               <div className="divider grey accent-3"></div>
            </div>
         </div>

         <div className="row">
            <div className="col">
               <button className="btn waves-effect waves-light" type="submit" name="action">
                  Flee
                  <i className="material-icons right">
                     <FontAwesomeIcon icon={faFlag} />
                  </i>
               </button>
            </div>

            <div className="col">
               <button className="btn waves-effect waves-light" type="submit" name="action">
                  Draw
                  <i className="material-icons right">
                     <FontAwesomeIcon icon={faHandshake} />
                  </i>
               </button>
            </div>

            <div className="col">
               <button className="btn waves-effect waves-light" type="submit" name="action">
                  Offer to surrender
                  <i className="material-icons right">
                     <FontAwesomeIcon icon={faFistRaised} />
                  </i>
               </button>
            </div>
         </div>
      </>
   )
}

//TODO figure out how to place pictures
