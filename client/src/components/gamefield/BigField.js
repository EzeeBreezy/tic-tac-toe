import React from 'react'
import { SmallField } from './SmallField'

export const BigField = () => {
   return (
      <table className="BigField centered">
         <tbody>
            <tr>
               <td>
                  <SmallField />
               </td>
               <td>
                  <SmallField />
               </td>
               <td>
                  <SmallField />
               </td>
            </tr>
            <tr>
               <td>
                  <SmallField />
               </td>
               <td>
                  <SmallField />
               </td>
               <td>
                  <SmallField />
               </td>
            </tr>
            <tr>
               <td>
                  <SmallField />
               </td>
               <td>
                  <SmallField />
               </td>
               <td>
                  <SmallField />
               </td>
            </tr>
         </tbody>
      </table>
   )
}
