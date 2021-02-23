import axios from 'axios'
import { getLocalSesion } from '../util/auth'

const headers = {
    'Content-Type' : 'application/json'
}

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_GATEWAY_URI,
});   


export const login = async (username, password) => {
    return axiosInstance.post('/admin/login', { username, password }, { headers })
}

export const getConfig = async () => {
    const { token } = await  getLocalSesion();
    return axiosInstance.get('/admin', { headers: { 'Authorization': `Bearer ${token}` }})
}

export const editConfig = async (value, configId) => {
    const { token } = await  getLocalSesion();
    return axiosInstance.put(`/admin/${configId}`, { default:value }, { headers: { 'Authorization': `Bearer ${token}` }})
}