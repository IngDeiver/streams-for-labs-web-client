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

export const download = async (videoId) => {
    const { token } = await getLocalSesion();
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.get(`/video/download/${videoId}`,
        {
            headers: { 'Authorization': `Bearer ${token}` },
            responseType: 'blob'
        })
}

export const removeVideos = async (video, isVideo = true) => {
    const { token } = await getLocalSesion();
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.delete(`${isVideo ? '/video' : '/photo'}`,
        {
            data: { files: video },
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        })
}