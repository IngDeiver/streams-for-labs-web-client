import axios from 'axios'
import { getLocalSesion } from '../util/auth'

const getAxiosInstance = () => {
    return axios.create({
        baseURL: `${process.env.REACT_APP_GATEWAY_SERVICE_BASE_URL}/api`
    });
}

export const listVideos = async () => {
    const { token } = await getLocalSesion();
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.get(`/video`,
        { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } })
}

