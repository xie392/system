import Form, { Item } from '@/components/auth/form'
import { SignInApi } from '@/http/auth'
import { useAuthStore } from '@/store/auth'
import { App } from 'antd'
import { useNavigate } from 'react-router-dom'

const items: Item[] = [
    {
        type: 'text',
        name: 'sno',
        placeholder: '学号',
        rules: [{ required: true, message: '请输入学号' }]
    },
    {
        type: 'password',
        name: 'password',
        placeholder: '密码',
        rules: [{ required: true, message: '请输入密码' }]
    }
]

const initialValues = {
    sno: 'test-1',
    password: '123456qq'
}

const SignInPage = () => {
    const navigate = useNavigate()
    const update = useAuthStore((state) => state.update)
    const { message } = App.useApp()

    const onFinish = async (values: any) => {
        const { code, data, msg } = await SignInApi(values)
        if (code !== 200) return message.error(msg)
        update({ token: data.token, userInfo: data.user })
        navigate('/')
    }

    return <Form items={items} initialValues={initialValues} onFinish={onFinish} />
}

export default SignInPage
