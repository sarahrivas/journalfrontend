const user = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        name: action.name,
        username: action.username,
        id: action.id,
        token: action.token
      }

    case 'LOGOUT':
      return {
        ...state,
        name: action.name,
        username: action.username,
        id: action.id,
        token: action.token
      }
    default:
      return state
  }
}

export default user;
