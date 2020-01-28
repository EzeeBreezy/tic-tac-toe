import React from 'react'

export const InfoPage = () => {
   return (
      <div className="row">
         <div className="col s6">
            <h2 className="font-fam-tidy">
               <strong className="font-fam-mainheader light-blue-text text-darken-2">Game board:</strong> Consists of 9
               ordinary tic-tac-toe boards
            </h2>
            <img src="#!" />
            <h2 className="font-fam-tidy">
               <strong className="font-fam-mainheader light-blue-text text-darken-2">Next move:</strong> Defined by the
               position of the opponent`s move
            </h2>
            <img src="#!" />
            <h2 className="font-fam-tidy">
               <strong className="font-fam-mainheader light-blue-text text-darken-2">
                  If the destination board has already been won:
               </strong>{' '}
               Pick any other board
            </h2>
            <img src="#!" />
         </div>
         <div className="col s6">
            <h2 className="font-fam-tidy">
               <strong className="font-fam-mainheader light-blue-text text-darken-2">
                  If there is a tie the board:
               </strong>{' '}
               It is considered as won by both <strong className="font-fam-mainheader red-text text-darken-3">X</strong>{' '}
               and <strong className="font-fam-mainheader light-blue-text text-darken-2">O</strong>
            </h2>
            <img src="#!" />
            <h2 className="font-fam-tidy">
               <strong className="font-fam-mainheader red-text text-darken-3">Victory:</strong> Win on 3 boards in a
               line
            </h2>
            <img src="#!" />
         </div>
      </div>
   )
}

//TODO collapsible?