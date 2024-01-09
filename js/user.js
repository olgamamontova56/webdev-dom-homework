// обьект пользователя для имени и токена 
export const user = {
    userName : JSON.parse(localStorage.getItem('userName')) || '', // берем имя пользователя из localStorage  или путое 
    token : JSON.parse(localStorage.getItem('token')) || '',
}

//  сохраняем имя и токен пользователя в LocalStorage 
export function setUser (userName, token){
  localStorage.setItem('userName', JSON.stringify(userName))
  localStorage.setItem('token', JSON.stringify(token))
}