import { MockMethod } from 'vite-plugin-mock'
import { createToken, filterPassword, formatDate, responseError, responseOK } from './_utils'
import { defaultUsers } from './_data'
import { faker } from '@faker-js/faker'

const baseUrl = '/api/auth'

export default [
    {
        url: `${baseUrl}/sign-in`,
        method: 'post',
        response: ({ body }) => {
            const { sno, password } = body
            if (!sno || !password) return responseError(400, '用户名或密码不能为空')
            const user = defaultUsers.find((item) => item.sno === sno && item.password === password)
            if (user) {
                return responseOK({
                    token: createToken(user.sno),
                    user: filterPassword(user)
                })
            }
            return responseError(400, '用户名或密码错误')
        }
    },
    {
        url: `${baseUrl}/sign-up`,
        method: 'post',
        response: ({ body }) => {
            const { sno, password, confirmPassword } = body
            if (!sno || !password || !confirmPassword) return responseError(400, '参数不能为空')
            if (password !== confirmPassword) return responseError(400, '两次密码输入不一致')
            if (password.length < 6) return responseError(400, '密码长度不能少于6位')
            const user = defaultUsers.find((item) => item.sno === sno)
            if (user) return responseError(400, '用户名已存在')

            const newUser = {
                sno,
                password,
                name: faker.person.firstName(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                address: faker.location.streetAddress(),
                date: formatDate(faker.date.past()),
                gender: faker.number.int({ min: 0, max: 1 }).toString(),
                age: faker.number.int({ min: 6, max: 65 }),
                avatar: faker.image.avatar()
            }
            defaultUsers.push(newUser)
            return responseOK(newUser)
        }
    },
    {
        url: `${baseUrl}/logout`,
        method: 'post',
        response: () => {
            return responseOK(null)
        }
    }
] as MockMethod[]
