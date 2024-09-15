import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * 深拷贝对象

 * @param value     克隆对象
 * @param seen      循环引用缓存
 * @returns 
 */
export function deepClone<T>(value: T, seen = new WeakMap<object, any>()): T {
    // 处理原始值、null 和 undefined
    if (value === null || typeof value !== 'object') {
        return value
    }

    // 检查循环引用
    if (seen.has(value as object)) {
        return seen.get(value as object)
    }

    // 处理 Date 对象
    if (value instanceof Date) {
        return new Date(value.getTime()) as any
    }

    // 处理 RegExp 对象
    if (value instanceof RegExp) {
        return new RegExp(value.source, value.flags) as any
    }

    // 处理 Map 对象
    if (value instanceof Map) {
        const mapCopy = new Map()
        seen.set(value, mapCopy) // 缓存克隆结果，防止循环引用
        value.forEach((val, key) => {
            mapCopy.set(deepClone(key, seen), deepClone(val, seen))
        })
        return mapCopy as any
    }

    // 处理 Set 对象
    if (value instanceof Set) {
        const setCopy = new Set()
        seen.set(value, setCopy) // 缓存克隆结果，防止循环引用
        value.forEach((val) => {
            setCopy.add(deepClone(val, seen))
        })
        return setCopy as any
    }

    // 处理数组
    if (Array.isArray(value)) {
        const arrCopy: any[] = []
        seen.set(value, arrCopy)
        value.forEach((item) => {
            arrCopy.push(deepClone(item, seen))
        })
        return arrCopy as T
    }

    // 处理普通对象
    const objCopy = Object.create(Object.getPrototypeOf(value))
    seen.set(value, objCopy)
    Object.keys(value).forEach((key) => {
        objCopy[key] = deepClone((value as { [key: string]: any })[key], seen)
    })

    return objCopy as T
}

/**
 * 获取 root css 变量值
 *
 * @param name 变量名
 * @returns
 */
export function getRootVar<T>(name: string): T {
    const color = getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim()
    if (color) return `hsl(${color})` as T
    return '' as T
}

/**
 * 节流
 *
 * @param fn 回调函数
 * @param delay 延迟时间
 * @returns
 */
export function throttle(fn: (...args: any[]) => void, delay: number = 500) {
    let timer: NodeJS.Timeout | null = null
    return function (this: any, ...args: any[]) {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args)
                timer = null
            }, delay)
        }
    }
}

/**
 * 随机生成 id
 *
 * @returns string
 */
export function generateId(): string {
    return Math.random().toString(36).substring(2, 9)
}
