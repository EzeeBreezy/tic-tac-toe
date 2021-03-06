import winValidator from '../helpers/winValidator'

export const gameReducer = (state, action) => {
   if (state === undefined)
      return {
         boardState: [
            [
               [
                  ['e', 'e', 'e'],
                  ['e', 'e', 'e'],
                  ['e', 'e', 'e']
               ],
               [
                  ['e', 'e', 'e'],
                  ['e', 'e', 'e'],
                  ['e', 'e', 'e']
               ],
               [
                  ['e', 'e', 'e'],
                  ['e', 'e', 'e'],
                  ['e', 'e', 'e']
               ]
            ],
            [
               [
                  ['e', 'e', 'e'],
                  ['e', 'e', 'e'],
                  ['e', 'e', 'e']
               ],
               [
                  ['e', 'e', 'e'],
                  ['e', 'e', 'e'],
                  ['e', 'e', 'e']
               ],
               [
                  ['e', 'e', 'e'],
                  ['e', 'e', 'e'],
                  ['e', 'e', 'e']
               ]
            ],
            [
               [
                  ['e', 'e', 'e'],
                  ['e', 'e', 'e'],
                  ['e', 'e', 'e']
               ],
               [
                  ['e', 'e', 'e'],
                  ['e', 'e', 'e'],
                  ['e', 'e', 'e']
               ],
               [
                  ['e', 'e', 'e'],
                  ['e', 'e', 'e'],
                  ['e', 'e', 'e']
               ]
            ]
         ],

         bigField: [
            ['e', 'e', 'e'],
            ['e', 'e', 'e'],
            ['e', 'e', 'e']
         ]
      }

   if (action.type === 'UPDATE_GAME_STATE') {
      let userSign = action.payload.playerX == localStorage.userId ? 'x' : 'o'
         console.log(userSign)
      return { userSign, ...action.payload }
   } 

   // if (action.type === 'TURN') {
   //    const newBoardState = [...state.boardState]
   //    newBoardState[action.payload[0]][action.payload[1]][action.payload[2]][action.payload[3]] = 'x'
   //    const newBigField = [...state.bigField]
   //    for (let i = 0; i < 3; i++)
   //       for (let j = 0; j < 3; j++) {
   //          newBigField[i][j] = winValidator(newBoardState[i][j])
   //       }

   //    return {
   //       ...state,
   //       boardState: newBoardState,
   //       bigField: newBigField
   //    }
   // }

   //TODO turn validator / next turn validator? read from back?

   return state
}
