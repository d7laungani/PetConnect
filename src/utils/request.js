import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://10.212.76.150:3000',
})

export const getRequest = (url) => (
    instance.get(url)
)

export const postRequest = (url, data) => (
    instance.post(url, data)
)

//    headers: {'Content-type': 'multipart/form-data'}