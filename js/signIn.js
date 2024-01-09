import { signIn } from "./api.js"
import { authForm } from "./constants.js"
import { user, setUser } from "./user.js"

export function acceptAuthForm(e){
    e.preventDefault()
    const {userName, password} = e.target.elements
    const obj = {
      login : userName.value,
      password : password.value
    }
    signIn(obj)
    .then(data => {
        setUser(data.user.name, data.user.token) 
        window.location = '/'
      })
      .catch(err => console.log(err.message))
}

console.log(user);

authForm.addEventListener('submit', acceptAuthForm)
  