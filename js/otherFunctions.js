import { myName, buttonElement, textInputElement, addForm, authStr } from "./constants.js";
import { user } from "./user.js";

//активация кнопки / отключения кнопки  
function actionBtn(disable, str ){
    buttonElement.disabled = disable;
    buttonElement.innerHTML = str; // наименование кнопки 
}

// проверка введенного текста на валидацию
function validation(){
    textInputElement.classList.remove("error"); //
      if (textInputElement.value === "") { //если поле ввода пустое
        textInputElement.classList.add("error");   //добавляем ошибку на полле вода 
        return;
      }
}

//меняем имя пользователя в поле с коментариями 
function setName(){
  myName.textContent = user.userName //строку с именем меняем на имя пользователя обрщ по id 
}

// изменение интерфейса для авторизованного пользователя
function eventComment(){
  if(user.token.length === 0){ // если нет токена 
    addForm.classList.add('none') // прячем 
    authStr.classList.remove('none') // показываем
  } else {
    addForm.classList.remove('none')
    authStr.classList.add('none')
  }
  setName()
}





export {actionBtn, validation, eventComment}