import { AuthParams } from '@/interface/http/auth'
import request from '@/lib/request'

const baseURL = '/api/auth'

export function SignInApi(data: AuthParams): Promise<ResponseData> {
    return request({
        url: `${baseURL}/sign-in`,
        data,
        method: 'POST'
    })
}

export function LogoutApi(): Promise<ResponseData> {
    return request({
        url: `${baseURL}/sign-out`,
        method: 'POST'
    })
}

export function SignUpApi(data: AuthParams): Promise<ResponseData> {
    return request({
        url: `${baseURL}/sign-up`,
        data,
        method: 'POST'
    })
}
