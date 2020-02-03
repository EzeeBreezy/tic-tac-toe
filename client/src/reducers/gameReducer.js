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
         ],
         _id: null,
         players: [],

         status: 'ACTIVE',
      }

   if (action.type === 'TURN') {
      const newBoardState = [...state.boardState]
      newBoardState[action.payload[0]][action.payload[1]][action.payload[2]][action.payload[3]] = 'x'
      const newBigField = [...state.bigField]
      for (let i = 0; i < 3; i++) 
         for (let j = 0; j < 3; j++) {
            newBigField[i][j] = winValidator(newBoardState[i][j])
         }

      return {
         ...state,
         boardState: newBoardState,
         bigField: newBigField
      }
   }

   //TODO start game, set signs
   //TODO turn validator / next turn validator

   return state
}
