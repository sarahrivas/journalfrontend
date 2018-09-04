const user = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        name: action.name,
        username: action.username
      }

    case 'LOGOUT':
      return {
        ...state,
        name: action.name,
        username: action.username
      }
    default:
      return state
  }
}

export default user;
