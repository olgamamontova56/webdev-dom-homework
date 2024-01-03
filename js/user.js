export const user = {
    userName : JSON.parse(localStorage.getItem('userName')) || '',
    token : JSON.parse(localStorage.getItem('token')) || '',
}

export function setUser (userName, token){
  localStorage.setItem('userName', JSON.stringify(userName))
  localStorage.setItem('token', JSON.stringify(token))
}