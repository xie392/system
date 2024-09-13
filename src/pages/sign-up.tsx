import Form, { Item } from '@/components/auth/form'
import { SignUpApi } from '@/http/auth'
import { useAuthStore } from '@/store/auth'
import { message } from 'antd'
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
    },
    {
        type: 'password',
        name: 'confirmPassword',
        placeholder: '确认密码',
        rules: [
            { required: true, message: '请确认密码' },
            ({ getFieldValue }) => ({
                validator(_rule, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                    }
                    if (value.length < 6) {
                        return Promise.reject('密码长度不能小于6位')
                    }
                    return Promise.reject('两次密码输入不一致')
                }
            })
        ]
    }
]

const SignUpPage = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate()
    const update = useAuthStore((state) => state.update)

    const onFinish = async (values: any) => {
        const { code, data, msg } = await SignUpApi(values)
        if (code !== 200) return messageApi.error(msg)
        update({ token: data.token, userInfo: data.user })
        navigate('/')
    }

    return (
        <>
            <Form items={items} onFinish={onFinish} type="sign-up" />
            {contextHolder}
        </>
    )
}

export default SignUpPage
