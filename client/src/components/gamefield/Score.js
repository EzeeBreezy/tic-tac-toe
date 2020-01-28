import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faFistRaised, faHandshake } from '@fortawesome/free-solid-svg-icons'


export const Score = () => {
   return (
      <>
         <div className="row">
            <div className="col">
               <img src="#!" />
               <h4 className='font-fam-mainheader'>Own Name</h4>
            </div>

            <div className="col">
               <img src="./vs.png" width="150px" />
            </div>

            <div className="col">
               <h4 className='font-fam-mainheader'>Oponent Name</h4>
               <img src="#!" />
            </div>
         </div>

         <div className="row">
            <div className="col">
               <img src="./X.png" width="100px" />
            </div>

            <div className="col">
               <img src="./O.png" width="100px" />
            </div>
         </div>

         <div className="row">
            <div className="col">
               <span className='font-fam-tidy'>System messages: turn/winner/flee/draw/surrender offered</span>
            </div>
         </div>

         <div className="row">
            <div className="col">
               <button className="btn waves-effect waves-light" type="submit" name="action">
                  Flee
                  <i className="material-icons right"><FontAwesomeIcon icon={faFlag} /></i>
               </button>
            </div>

            <div className="col">
               <button className="btn waves-effect waves-light" type="submit" name="action">
                  Draw
                  <i className="material-icons right"><FontAwesomeIcon icon={faHandshake} /></i>
               </button>
            </div>

            <div className="col">
               <button className="btn waves-effect waves-light" type="submit" name="action">
                  Offer to surrender 
                  <i className="material-icons right"><FontAwesomeIcon icon={faFistRaised} /></i>
               </button>
            </div>
         </div>
      </>
   )
}

//TODO figure out how to place pictures
