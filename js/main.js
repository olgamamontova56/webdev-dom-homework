import { getComment, postComment } from "./api.js";
import { renderElem } from "./elem.js";
import { buttonElement, textInputElement, ListElement, } from "./constants.js";
import { eventComment, actionBtn, validation } from "./otherFunctions.js";
import { user } from "./user.js";

eventComment()

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
    initLikeListeners(comments);
}

//обработчик лайков 
const initLikeListeners = (comments) => {
  const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach((likeButton, index) => {
      likeButton.addEventListener('click', (event) => {
        event.stopPropagation();
        const index = likeButton.dataset.index;
        comments[index].likes += comments[index].isLiked ? -1 : +1;
        comments[index].isLiked = !comments[index].isLiked;
        initLikes(likeButton, comments[index])
      })
    })  
}

function initLikes (elem , obj){
  const likesCounter = elem.previousElementSibling
  likesCounter.textContent = obj.likes
}

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
    actionBtn(true, 'Элемент добавляеться')
    postComment(textInputElement, user.userName)
        .then(() => {
            APIGET()
            actionBtn(false, 'Добавить')
        })
        .catch((error) => {
            actionBtn(false, 'Добавить')
            alert (error.message)
        })    
}


APIGET();
actionBtn(true, 'Коментарии загружаются')

buttonElement.addEventListener("click", sendComment)
