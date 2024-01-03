import { myName, buttonElement, textInputElement, addForm, authStr } from "./constants.js";
import { user } from "./user.js";

function actionBtn(disable, str){
    buttonElement.disabled = disable;
    buttonElement.innerHTML = str;
}

function validation(){
    textInputElement.classList.remove("error");
      if (textInputElement.value === "") {
        textInputElement.classList.add("error");
        return;
      }
}

function setName(){
  myName.textContent = user.userName
}

function eventComment(){
  if(user.token.length === 0){
    addForm.classList.add('none')
    authStr.classList.remove('none')
  } else {
    addForm.classList.remove('none')
    authStr.classList.add('none')
  }
  setName()
}





export {actionBtn, validation, eventComment}