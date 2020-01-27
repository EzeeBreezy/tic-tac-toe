import React from 'react'
import { Cell } from './Cell'

export const SmallField = () => {
   return (
      <table className="SmallField" align="center">
         <tbody>
            <tr>
               <td>
                  <Cell />
               </td>
               <td>
                  <Cell />
               </td>
               <td>
                  <Cell />
               </td>
            </tr>
            <tr>
               <td>
                  <Cell />
               </td>
               <td>
                  <Cell />
               </td>
               <td>
                  <Cell />
               </td>
            </tr>
            <tr>
               <td>
                  <Cell />
               </td>
               <td>
                  <Cell />
               </td>
               <td>
                  <Cell />
               </td>
            </tr>
         </tbody>
      </table>
   )
}
