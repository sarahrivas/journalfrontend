export const logIn = (user) => {
  localStorage.setItem('token', user.token)
  localStorage.setItem('username', user.username)
  localStorage.setItem('name', user.name);
  localStorage.setItem('id', user.id);

  return {
    type: 'LOGIN',
    name: user.name,
    username: user.username,
    token: user.token,
    id: user.id
  }
}

export const logOut = () => {
  localStorage.clear();

  return {
    type: 'LOGOUT',
    name: null,
    username: null,
    token: null,
    id: null
  }
}
