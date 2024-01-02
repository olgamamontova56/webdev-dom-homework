export const renderElem = (comment, index) => {
  return `<li class="comment">
        <div class="comment-header">
          <div class = 'comment-Author'>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="like-button ${comment.isLiked ? '-active-like ' : ''}" data-index="${index}""></button>
          </div>
        </div>
        </li>`
}