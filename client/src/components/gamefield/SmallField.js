import React from 'react'
import { ConnectedCell as Cell } from './Cell'


export const SmallField = ({ fieldState, coords }) => {
   return (
      <table className="SmallField" align="center">
         <tbody>
            {fieldState.map((row, rowIndex) => (
               <tr key={`${coords}${rowIndex}`} >
                  {row.map((sign, cellIndex) => (
                     <td key={`${coords}${rowIndex}${cellIndex}`}>
                        <Cell className='hoverable' sign={sign} coords={`${coords}${rowIndex}${cellIndex}`} />
                     </td>
                  ))}
               </tr>
            ))}
         </tbody>
      </table>
   )
}
