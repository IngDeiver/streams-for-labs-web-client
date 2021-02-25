import axios from 'axios'
import { getLocalSesion } from '../util/auth'

const headers = {
    'Content-Type' : 'multipart/form-data'
}

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_GATEWAY_URI,
});

export const upload = async (formData, onUploadProgress) => {
    const { token } = await  getLocalSesion();
    console.log(token);
    return axiosInstance.post('/file', formData, 
    { headers: {...headers, 'Authorization': `Bearer ${token}` },
    onUploadProgress})
}
