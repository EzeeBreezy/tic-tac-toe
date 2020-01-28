import React from 'react'
import { BigField } from '../components/gamefield/BigField'
import { Score } from '../components/gamefield/Score'

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

//TODO className divider
//TODO hoverable