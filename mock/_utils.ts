import { defaultUsers } from './_data'

type ResponseData<T> = {
    code: number
    msg: string
    data: T
}

export function responseOK<T extends Record<string, any> | null>(data: T): ResponseData<T> {
    return {
        code: 200,
        msg: 'OK',
        data: data
    }
}

export function responseError(code: number = 500, msg: string): ResponseData<null> {
    return {
        code,
        msg,
        data: null
    }
}

// 401 Unauthorized
export const responseUnauthorized = responseError(401, 'Unauthorized')

// 403 Forbidden
export const responseForbidden = responseError(403, 'Forbidden')

// 404 Not Found
export const responseNotFound = responseError(404, 'Not Found')

// 判断是否 401 Unauthorized
export function isUnauthorized(requset: any): boolean {
    return requset.headers.authorization === undefined
}

export function createToken(userId: string): string {
    return `Bearer ${userId}`
}

export function parseToken(token: string): string {
    return token.split(' ')[1]
}

export function verifyToken(requset: any): string | null {
    if (!isUnauthorized(requset)) return null
    const token = requset.headers.authorization
    const userId = parseToken(token)
    const user = defaultUsers.find((u) => u.sno === userId)
    if (user) return userId
    return null
}

// 过滤掉密码字段
export function filterPassword(user: any): any {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user
    return rest
}
