import React from 'react'
import { ConnectedBigField as BigField } from '../components/gamefield/BigField'
import { ConnectedScore as Score } from '../components/gamefield/Score'

export const GamePage = () => {
   return (
      <>
         <div className="row" style={{marginTop: '2rem'}}>
            <div className="col s5">
               <Score />
            </div>

            <div className="col s7">
               <BigField />
            </div>
         </div>
      </>
   )
}