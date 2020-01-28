import React from 'react'
import { BigField } from '../components/gamefield/BigField'
import { Score } from '../components/gamefield/Score'

export const GamePage = () => {
   return (
      <>
         <div className="row">
            <div className="col">
               <Score />
            </div>

            <div className="col">
               <BigField />
            </div>
         </div>
      </>
   )
}
