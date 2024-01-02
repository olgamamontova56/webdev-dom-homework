import { getComment, postComment } from "./api.js";
import { renderElem } from "./elem.js";
import { buttonElement, textInputElement, nameInputElement, ListElement } from "./constants.js";
import { actionBtn, validation } from "./otherFunctions.js";

//функция копирования контента коментария 
function copyElement(item) {
    const Author = item.querySelector('.comment-Author').textContent
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
  
  // собирать данные и отправлять в  инпут
  const commentsElement = document.querySelectorAll('.comment') 
  commentsElement.forEach((item) => {
    item.querySelector('.comment-text').addEventListener('click', () =>  copyElement(item))
  })
    initLikeListeners();
}

//обработчик лайков 
const initLikeListeners = () => {
  const likeButtons = document.querySelectorAll('.like-button');
    for (const likeButton of likeButtons) {
      likeButton.addEventListener('click', (event) => {
        event.stopPropagation();
        const index = likeButton.dataset.index;
        comments[index].likes += comments[index].isLiked ? -1 : +1;
        comments[index].isLiked = !comments[index].isLiked;
      
        // renderComment();
      })
    }
}

//запрос в API
function APIGET() {
    getComment()
        .then((responseData) => {
            const commentList = responseData.comments.map((comment) => {
                return {
                name: comment.author.name,
                date: comment.date,
                id: comment.id,
                isLiked: comment.isLiked,
                likes: comment.likes,
                text: comment.text,
                };
            });
            renderComment(commentList)
        })
        .then(() => {
            actionBtn(false, 'Добавить')
        })  
        .catch((error) => {
            alert (error.message)
        })  

}

function sendComment(){
    validation()
  //блокировка кнопки 
    actionBtn(true, 'Элемент добавляеться')
  //запрос в API
    postComment(nameInputElement, textInputElement)
        .then(() => {
            APIGET()
            actionBtn(false, 'Добавить')
        })
        .catch((error) => {
            actionBtn(false, 'Добавить')
            alert (error.message)
        })    
}

//активация кнопки //подцветка поля ввода //шаблон комента 
APIGET();
actionBtn(true, 'Коментарии загружаются')

buttonElement.addEventListener("click", sendComment)