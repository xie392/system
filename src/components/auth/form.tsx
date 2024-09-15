import { Flex } from 'antd'
import AuthHeader from './header'
import type { InputProps } from 'antd'
import type { Rule } from 'antd/es/form'
import { Store } from 'antd/es/form/interface'
import CommonForm from '@/components/common/form'

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
    return (
        <Flex className="container min-h-screen" align="center" justify="center" vertical>
            <AuthHeader type={type} />
            <CommonForm
                className="w-[350px]"
                items={items}
                onFinish={onFinish}
                initialValues={initialValues}
                buttonText={type === 'sign-in' ? '登录' : '注册'}
                buttonClassName="w-full"
            />
        </Flex>
    )
}
export default Form
