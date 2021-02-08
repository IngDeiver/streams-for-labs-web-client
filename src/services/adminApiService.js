import axios from 'axios'
import { checkToken } from '../util/auth'

//axios.defaults.headers.common['Authorization']  = `Bearer ${idToken}`

const headers = {
    'Content-Type' : 'application/json'
}

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_GATEWAY_URI,
});   


export const login = async (username, password) => {
    //const {idToken} = await checkToken()
    return axiosInstance.post('/admin/login', { username, password }, { headers })
}