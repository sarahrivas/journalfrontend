export const logIn = (user) => {
  return {
    type: 'LOGIN',
    name: user.name,
    username: user.username
  }
}

export const logOut = () => {
  return {
    type: 'LOGOUT',
    name: null,
    username: null
  }
}
