import React from 'react'
import picX from '../../assets/images/X.png'
import picO from '../../assets/images/O.png'
import { SmallField } from './SmallField'
import { connect } from 'react-redux'

function BigField({ boardState, bigField, nextTurn }) {
   console.log(boardState)

   const cellHandler = (X, Y) => {
      if (bigField[X][Y] === 'x') return picX
      if (bigField[X][Y] === 'o') return picO
      return false
   }

   return (
      <table className="BigField centered">
         <tbody>
            {boardState.map((row, boardIndex) => (
               <tr key={boardIndex}>
                  {row.map((fieldState, fieldIndex) => (
                     <td key={`${boardIndex}${fieldIndex}`}>
                        {cellHandler(boardIndex, fieldIndex) ? (
                           <img src={cellHandler(boardIndex, fieldIndex)} width="125px" />
                        ) : (
                           <SmallField fieldState={fieldState} coords={`${boardIndex}${fieldIndex}`} />
                        )}
                     </td>
                  ))}
               </tr>
            ))}
         </tbody>
      </table>
   )
}

const connected = connect(state => ({ boardState: state.game.boardState, bigField: state.game.bigField }), {})

export const ConnectedBigField = connected(BigField)
