import axios from 'axios'
import { getLocalSesion } from '../util/auth'
import { queryVault } from '../services/vaultService'

const headers = {
    'Content-Type' : 'application/json'
}

const getAxiosInstance = async () => {
    const { data: {data} } =  await queryVault(process.env.REACT_APP_VAULT_SECRET_ENV_URI)
    return axios.create({
        baseURL: `${data.gateway}/api`
    });   
}


export const login = async (username, password) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.post('/admin/login', { username, password }, { headers })
}

export const getConfig = async () => {
    const { token } = await  getLocalSesion();
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.get('/admin', { headers: { 'Authorization': `Bearer ${token}` }})
}

export const editConfig = async (value, configId) => {
    const { token } = await  getLocalSesion();
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.put(`/admin/${configId}`, { default:value }, { headers: { 'Authorization': `Bearer ${token}` }})
}