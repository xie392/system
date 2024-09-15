import { PageParams } from '@/interface/http/student'
import { Student } from '@/interface/model/student'
import request from '@/lib/request'

const baseURL = '/api/student'

export function GetStudentsApi(params?: PageParams): Promise<ResponseData> {
    return request({
        url: `${baseURL}`,
        params,
        // 用于取消请求的信号 id
        signalId: 'GetStudentsApi'
    })
}

export function GetStudentApi(sno: string): Promise<ResponseData> {
    return request({
        url: `${baseURL}/info/${sno}`
    })
}

export function CreateStudentApi(data: Student): Promise<ResponseData> {
    return request({
        url: `${baseURL}/info`,
        method: 'POST',
        data
    })
}

export function UpdateStudentApi(data: Student, sno: string): Promise<ResponseData> {
    return request({
        url: `${baseURL}/info/${sno}`,
        method: 'PUT',
        data
    })
}

export function DeleteStudentApi(ids: string[]): Promise<ResponseData> {
    return request({
        url: `${baseURL}/info/delete`,
        method: 'DELETE',
        data: { ids }
    })
}
