import { Button, Flex, Form as AntdForm, Input } from 'antd'
import AuthHeader from './header'
import type { InputProps } from 'antd'
import type { Rule } from 'antd/es/form'
import { Store } from 'antd/es/form/interface'

export interface Item extends Partial<InputProps> {
    prefix?: React.ReactNode | null
    rules: Rule[]
}

export interface FormProps {
    items: Item[]
    type?: 'sign-in' | 'sign-up'
    initialValues?: Store
    onFinish?: (values: any) => void
}

const Form: React.FC<FormProps> = ({ items, type = 'sign-in', initialValues, onFinish }) => {
    const [form] = AntdForm.useForm()

    return (
        <Flex className="container min-h-screen" align="center" justify="center" vertical>
            <AuthHeader type={type} />
            <AntdForm
                className="w-[350px]"
                layout="vertical"
                form={form}
                onFinish={onFinish}
                initialValues={initialValues}
            >
                {items.map((item, index) => (
                    <AntdForm.Item key={index} rules={item.rules} name={item.name}>
                        <Input size="large" {...item} />
                    </AntdForm.Item>
                ))}
                <AntdForm.Item>
                    <Button className="w-full" type="primary" size="large" htmlType="submit">
                        {type === 'sign-in' ? '登录' : '注册'}
                    </Button>
                </AntdForm.Item>
            </AntdForm>
        </Flex>
    )
}
export default Form
