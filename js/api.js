
// получаем ответ от сервера
export function getComment(){
    return fetch('https://wedev-api.sky.pro/api/v1/:olga-mamontova/comments',{ //ссылка сервера
        method: 'GET', //метод 
    }).then((response ) => response.json()) //переводем ответ в формат json
}

// проверяем ответ на ошибки 
function getResponce(response){
    if (response.status === 201) { //если статус 201 
        return response.json() //ответ преобразуем в json
    } else if (response.status === 400 || 500){ // если плохой запрос
        throw new Error ('Плохой запрос'); //выводим ошибку
    } else {
        throw new Error('Сервер упал') //в остальных случаях ошибка
    }
}

//запрос на сервер
export function postComment(textInputElement, userName){ //аругменты введеного коментария и имя пользователя 
   return fetch( 'https://wedev-api.sky.pro/api/v1/:olga-mamontova/comments',{ //ссылка сервера
        method: 'POST', // метод 
        body: JSON.stringify({ // преобразовываем запрос для сервера
          text: textInputElement.value, // запрос содержит введенный текст
          name : userName, // и имя
        //   forceError: true,
        })
    }).then((response ) => { // получаем ответ
        return getResponce(response) // проверяем на ошибки 
    })
}

// запрос на авторизацию 
export function signIn(body){
    return fetch( 'https://wedev-api.sky.pro/api/user/login',{
        method: 'POST',
        body: JSON.stringify(body)
    }).then((response ) => {
        return getResponce(response)
    })
}



