import { useAuthStore } from '@/store/auth'
import axios, { type AxiosResponse } from 'axios'

declare module 'axios' {
    export interface AxiosRequestConfig {
        signalId?: string
    }
}

const abortControllers = new Map<string, AbortController>()

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

        // 用于取消上一次请求
        if (config.signalId) {
            const previousController = abortControllers.get(config.signalId)
            if (!previousController) return config
            if (previousController) previousController.abort()
            const controller = new AbortController()
            config.signal = controller.signal
            abortControllers.set(config.signalId, controller)
        }
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
