const usersRegistry = (state, action) => {
   if (state === undefined) return []

   //!!!!!!!!!!!!!!!!!!!

   //socketId: {
   //     nickname: null,
   //     userId: null,
   //     status: null,
   //     currentGame: null,
   //     sign: null,
   //     turn: null
   // }

   //!!!!!!!!!!!!!!!!!!!!!!!!!

   if (action.type === 'UPDATE_USER_LIST')
      return [
        ...state,
        ...action.payload
      ]

      if (action.type === 'UPDATE_USER') {
        const newState = state.map(user => {
          if (user._id === action.payload.id) user[action.payload.field] = action.payload.value
        })
        return newState
      }





//    if (action.type === 'DISCONNECT')
//       return {
//          // isAuthenticated: false,
//          // _id: null,
//          // nickname: null,
//          // login: null,
//          // avatar: null,
//          // status: 'OFFLINE',
//          // currentGame: null,
//       }

//    if (action.type === 'SWITCH_STATUS') return {
//        ...state,
//        state[action.payload.id].status : action.payload.status
//    }

   if (action.type === 'TURN') return {}

   return state
}

exports.usersRegistry = usersRegistry

//TODO should be users registry

//TODO i need thunk?
