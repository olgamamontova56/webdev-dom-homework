export function getComment(){
    return fetch('https://wedev-api.sky.pro/api/v1/:olga-mamontova/comments',{
        method: 'GET',
    }).then((response ) => response.json())
}

function getResponce(response){
    if (response.status === 201) {
        return response.json()
    } else if (response.status === 400 || 500){
        throw new Error ('Плохой запрос');
    } else {
        throw new Error('Сервер упал')
    }
}

export function postComment(textInputElement, userName){
   return fetch( 'https://wedev-api.sky.pro/api/v1/:olga-mamontova/comments',{
        method: 'POST',
        body: JSON.stringify({
          text: textInputElement.value,
          name : userName,
        //   forceError: true,
        })
    }).then((response ) => {
        return getResponce(response)
    })
}

export function signIn(body){
    return fetch( 'https://wedev-api.sky.pro/api/user/login',{
        method: 'POST',
        body: JSON.stringify(body)
    }).then((response ) => {
        return getResponce(response)
    })
}



