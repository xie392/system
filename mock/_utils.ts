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
export function isUnauthorized(headers: any): boolean {
    return !headers?.authorization
}

export function createToken(userId: string): string {
    return `Bearer ${userId}`
}

export function parseToken(token: string): string {
    return token.split(' ')[1]
}

export function verifyToken(headers: any): string | null {
    if (isUnauthorized(headers)) return null
    const token = headers?.authorization
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

// 随机生成 id
export function generateId(): string {
    return Math.random().toString(36).substring(2, 9)
}

// 格式化时间
export function formatDate(date: Date): string {
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
}
