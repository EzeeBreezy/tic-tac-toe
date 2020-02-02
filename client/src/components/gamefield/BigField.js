import React from 'react'
import { SmallField } from './SmallField'
import { connect } from 'react-redux'


function BigField({ boardState }) {
   return (
      <table className="BigField centered">
         <tbody>
         {boardState.map((row, boardIndex) => (
               <tr key={boardIndex}>
                  {row.map((fieldState, fieldIndex) => (
                     <td key={`${boardIndex}${fieldIndex}`}>
                        <SmallField fieldState={fieldState} coords={`${boardIndex}${fieldIndex}`} />
                     </td>
                  ))}
               </tr>
            ))}
         </tbody>
      </table>
   )
}

const connected = connect(state => ({ boardState: state.game.boardState }), {})

export const ConnectedBigField = connected(BigField)