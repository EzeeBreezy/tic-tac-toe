export const userReducer = (state, action) => {
    
    if (state === undefined) return { 
        isAuthenticated: false,
        _id: null,
        nickname: null,
        login: null,
        avatar: null,
        status: 'OFFLINE',
        currentGame: null,
        //TODO do i need last?
        gameStats: {}
    }

    //TODO should i use socketHandlers and localstorage here?
    if (action.type === 'LOG_IN') return { 
        ...state,
        ...action.payload,
        isAuthenticated: true
    } 
    
    if (action.type === 'LOG_OUT') return { 
        isAuthenticated: false,
        _id: null,
        nickname: null,
        login: null,
        avatar: null,
        status: 'OFFLINE',
        currentGame: null,

        //!!!!!!!
        gameStats: {}
        //!!!!!!!!!

    }
    
    return state
 }