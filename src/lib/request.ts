import { useAuthStore } from '@/store/auth'
import axios, { type AxiosResponse } from 'axios'

const request = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

request.interceptors.request.use(
    (config) => {
        const { token } = useAuthStore.getState()
        if (token) config.headers.Authorization = token
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    (response) => {
        return response.data as AxiosResponse<ResponseData>
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default request
