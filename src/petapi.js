import { postRequest, getRequest } from './utils/request'




export const uploadPet = (data) => {

    return postRequest('/search', data)

        .then(function(response) {
            return response['data']
        }) .then(
            response => ({ response }),
            error => ({ error: error.message || 'Something shitty happened' })
        );
}
