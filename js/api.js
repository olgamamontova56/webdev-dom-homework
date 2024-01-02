export function getComment(){
    return fetch('https://wedev-api.sky.pro/api/v1/:olga-mamontova/comments',{
        method: 'GET',
    }).then((response ) => response.json())
}

export function postComment(textInputElement, nameInputElement){
   return fetch( 'https://wedev-api.sky.pro/api/v1/:olga-mamontova/comments',{
        method: 'POST',
        body: JSON.stringify({
          text: textInputElement.value,
          name : nameInputElement.value,
          forceError: true,
        })
    }).then((response ) => {
        if (response.status === 201) {
            return response.json()
        } else if (response.status === 400 || 500){
            throw new Error ('Плохой запрос');
        } else {
            throw new Error('Сервер упал')
        }
    })
}