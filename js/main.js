import { getComment, postComment } from "./api.js";
import { renderElem } from "./elem.js";
import { buttonElement, textInputElement, ListElement, } from "./constants.js";
import { eventComment, actionBtn, validation } from "./otherFunctions.js";
import { user } from "./user.js";
import { formatDateToRu, formatDateToUs } from "../lib/formatDate/formatDate.js"

eventComment()

//функция копирования контента коментария
function copyElement(item) {
    const Author = item.querySelector('.comment-Author').textContent //забираем данные из дом элемента 
    const content = item.querySelector('.comment-text').textContent
    textInputElement.value = `
      ${Author}
      ------
      ${content}
      ------
    `
} 

//добавление комента через рендер 
const renderComment = (comments) => {
    const commentHtml = comments
      .map(renderElem)
      .join('');

    ListElement.innerHTML = commentHtml;
  
  // добавления слушателя событий для копирования 
  const commentsElement = document.querySelectorAll('.comment') //находим все коментарии на странице 
  commentsElement.forEach((item) => { //перебираем все коментарии 
    item.querySelector('.comment-text').addEventListener('click', () =>  copyElement(item)) // добавляем слушатель события на строку коментария для копирования 
  })
  // добавления слушателя событий для лайков 
    initLikeListeners(comments); 
}

//обработчик лайков 
const initLikeListeners = (comments) => {
  const likeButtons = document.querySelectorAll('.like-button'); // находим кнопки по селектору
    likeButtons.forEach((likeButton, index) => {  
      likeButton.addEventListener('click', (event) => { // 
        event.stopPropagation(); // предотвращаем добавления слушателья событий на потомков лайк-бтн  
        const index = likeButton.dataset.index; // 
        comments[index].likes += comments[index].isLiked ? -1 : +1;
        comments[index].isLiked = !comments[index].isLiked;
        initLikes(likeButton, comments[index])
      })
    })  
}
 // изменяем количество лайков 
function initLikes (elem , obj){
  const likesCounter = elem.previousElementSibling
  likesCounter.textContent = obj.likes
}

// получаем коментарий из сервера 
function APIGET() {
    getComment() //получаем ответ
        .then((responseData) => { 
            const commentList = responseData.comments.map((comment) => { // 
                return {
                name: comment.author.name,
                date: new Date(comment.date),
                id: comment.id,
                isLiked: comment.isLiked,
                likes: comment.likes,
                text: comment.text,
                };
            });
            renderComment(commentList) // рендер переменной с полученым и приобразованным ответом
        })
        .then(() => {
            actionBtn(false, 'Добавить') //разблокировка кнопки
        })  
        .catch((error) => { //обпаботчик ошибок
            alert (error.message)
        })  
}

//отправка комента
function sendComment(){  
    validation() //проверяем на валидацию
    actionBtn(true, 'Элемент добавляеться') // блокируем кнопку
    postComment(textInputElement, user.userName)  // функция отправки запроса на сервер с введеным текстом и именем пользователя 
        .then(() => {
            APIGET() // функция обработки ответа 
            actionBtn(false, 'Добавить') // разблокировка кнопки
        })
        .catch((error) => { // обработчик ошибок
            actionBtn(false, 'Добавить')
            alert (error.message)
        })    
}


APIGET(); 
actionBtn(true, 'Коментарии загружаются') //блокировка кнопки 

buttonElement.addEventListener("click", sendComment) //слушатель события при нажатии на кнопку
