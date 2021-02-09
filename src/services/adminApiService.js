import axios from 'axios'

const headers = {
    'Content-Type' : 'application/json'
}

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_GATEWAY_URI,
});   


export const login = async (username, password) => {
    return axiosInstance.post('/admin/login', { username, password }, { headers })
}