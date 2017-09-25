import { call, put, takeLatest, take, fork, all, throttle } from 'redux-saga/effects'
import * as homeModel from './reducks/home.model'
import { getPhotos } from '../../flikrapi'
import { uploadPet } from '../../petapi'

function* homeSaga(action) {
    console.log(action.type)
    if (action.type === homeModel.QUERY_PETS_LIST) {
        try {
            const response = yield call(uploadPet, action.payload.search )
            console.log('og response is ' + JSON.stringify(response))
            const pets = response.data.photos.photo

            if (pets != null) {

                yield put({
                    type: homeModel.QUERY_PETS_LIST_SUCCESSFUL,
                    payload: pets
                })
            } else {
                yield put({
                    type: homeModel.QUERY_PETS_LIST_FAILED,
                    payload: response.error``
                })

            }
        } catch(e) {

            yield put({
                type: homeModel.QUERY_PETS_LIST_FAILED,
                payload: "Unknown error occured"
            })
        }
    }

}

export default function* rootHomeSaga() {
    yield all([
        takeLatest(homeModel.QUERY_PETS_LIST, homeSaga),
    ])

}
