import { buttonElement, nameInputElement, textInputElement } from "./constants.js";

function actionBtn(disable, str){
    buttonElement.disabled = disable;
    buttonElement.innerHTML = str;
}

function validation(){
    nameInputElement.classList.remove("error");
    textInputElement.classList.remove("error");
      if (nameInputElement.value === "" || textInputElement.value === "") {
        nameInputElement.classList.add("error");
        textInputElement.classList.add("error");
        return;
      }
}

export {actionBtn, validation}