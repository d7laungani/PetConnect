import * as homeModel from './home.model'

export function queryPhotos (search){
    return {
        type: homeModel.QUERY_PHOTOS_LIST,
        payload: search
    }
}


export function queryPets (search){
    return {
        type: homeModel.QUERY_PETS_LIST,
        payload: search
    }
}