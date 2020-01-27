export const loginReducer = (state, action) => {
    if (state === undefined) return { isAuthenticated: false }
    if (action.type === 'LOG_IN') return { isAuthenticated: true }
    if (action.type === 'LOG_OUT') return { isAuthenticated: false }
    return state
}