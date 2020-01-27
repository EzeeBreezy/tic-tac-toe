export const loginReducer = (state, action) => {
   if (state === undefined) return { isAuthenticated: false }
   if (action.type === 'LOG_IN') return { isAuthenticated: true } //TODO should i use socketHandlers and localstorage here?
   if (action.type === 'LOG_OUT') return { isAuthenticated: false }
   return state
}
