import axios from 'axios'
import { getLocalSesion } from '../util/auth'

const multipartHeader = {
    'Content-Type' : 'multipart/form-data'
}

const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/api",
});

export const upload = async (formData, onUploadProgress) => {
    const { token } = await  getLocalSesion();
    console.log(token);
    return axiosInstance.post('/file', formData, 
    { headers: {...multipartHeader, 'Authorization': `Bearer ${token}` },
    onUploadProgress})
}

export const getFiles = async () => {
    const { token } = await  getLocalSesion();
    return axiosInstance.get('/file', 
    { headers: {'Authorization': `Bearer ${token}`, 'Content-Type' : 'application/json' }})
}