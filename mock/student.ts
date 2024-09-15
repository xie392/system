import { MockMethod } from 'vite-plugin-mock'
import { filterPassword, generateId, responseError, responseOK, responseUnauthorized, verifyToken } from './_utils'
import { defaultUsers } from './_data'

const baseUrl = '/api/student'

export default [
    {
        url: `${baseUrl}/info/:id`,
        method: 'get',
        response: ({ headers, query }) => {
            const sno = verifyToken(headers)
            if (!sno) return responseUnauthorized
            const { id = '' } = query
            const user = defaultUsers.find((u) => u.sno === id)
            if (!user) return responseError(400, '找不到该学生')
            return responseOK(user)
        }
    },
    {
        url: `${baseUrl}/info`,
        method: 'post',
        response: ({ body, headers }) => {
            const sno = verifyToken(headers)
            if (!sno) return responseUnauthorized
            const student = {
                ...body,
                sno: `test-${generateId()}`
            }
            defaultUsers.unshift(student)
            return responseOK(student)
        }
    },
    {
        url: `${baseUrl}/info/:id`,
        method: 'put',
        response: ({ body, headers, query }) => {
            const sno = verifyToken(headers)
            if (!sno) return responseUnauthorized
            const { id = '' } = query
            const index = defaultUsers.findIndex((u) => u.sno === id)
            if (index === -1) return responseError(400, '找不到该学生')
            defaultUsers[index] = {
                ...defaultUsers[index],
                ...body
            }
            return responseOK(defaultUsers[index])
        }
    },
    {
        url: `${baseUrl}/info/delete`,
        method: 'delete',
        response: ({ headers, body }) => {
            const sno = verifyToken(headers)
            if (!sno) return responseUnauthorized
            const { ids } = body
            //! 这里需要事务处理，这里只做简单处理
            const indexs = ids.map((id: string) => defaultUsers.findIndex((u) => u.sno === id))
            if (indexs.length !== ids.length) return responseError(400, '有不存在的学生')
            // 删除
            for (let i = indexs.length - 1; i >= 0; i--) {
                defaultUsers.splice(indexs[i], 1)
            }
            return responseOK(null)
        }
    },
    {
        url: `${baseUrl}`,
        method: 'get',
        response: ({ query, headers }) => {
            const sno = verifyToken(headers)
            if (!sno) return responseUnauthorized

            const { keyword, page = 1, pageSize = 10 } = query
            let list: any[] = []
            if (keyword) {
                list = defaultUsers.filter(
                    (u) => u.sno !== sno && (u.name.includes(keyword) || u.sno.includes(keyword))
                )
            } else {
                list = defaultUsers.filter((u) => u.sno !== sno)
            }
            const start = (Number(page) - 1) * Number(pageSize)
            const end = start + Number(pageSize)
            const total = list.length
            const result = list.slice(start, end).map((u) => filterPassword(u))
            return responseOK({
                list: result,
                total,
                pageSize,
                page,
                totalPage: Math.ceil(total / pageSize)
            })
        }
    }
] as MockMethod[]
