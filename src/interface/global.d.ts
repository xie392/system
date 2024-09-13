export declare global {
    interface ResponseData<T extends any = any> {
        code: number
        data: T
        msg: string
    }
}
