import { MockMethod } from 'vite-plugin-mock'
import { responseError, responseOK, responseUnauthorized, verifyToken } from './_utils'
import { defaultUsers } from './_data'

const baseUrl = '/api/student'

export default [
    {
        url: `${baseUrl}/:id`,
        method: 'get',
        response: ({ req }) => {
            const id = req.params.id
            const sno = verifyToken(req)
            if (id !== sno) return responseUnauthorized
            const user = defaultUsers.find((u) => u.sno === id)
            if (!user) return responseError(400, '找不到该学生')
            return responseOK(user)
        }
    },
    {
        url: `${baseUrl}`,
        method: 'get',
        response: ({ req }) => {
            const sno = verifyToken(req)
            if (!sno) return responseUnauthorized
            return responseOK(defaultUsers.filter((u) => u.sno === sno))
        }
    }
] as MockMethod[]
