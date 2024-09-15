import { InputProps, Form, Input, Button, Row, Col, Select, DatePicker } from 'antd'
import { Rule } from 'antd/es/form'
import { Store } from 'antd/es/form/interface'
import { Gutter } from 'antd/es/grid/row'
import { InputType } from '@/lib/enum'
import { useCallback } from 'react'

export interface Item extends Partial<InputProps> {
    prefix?: React.ReactNode | null
    rules: Rule[]
    label?: string
    options?: Array<{ label: string; value: string }>
    inputType?: InputType
}

interface CommonFormProps {
    items: Item[]
    children?: React.ReactNode
    initialValues?: Store
    onFinish?: (values: any) => void
    className?: string
    buttonText?: string
    buttonClassName?: string
    gutter?: Gutter | [Gutter, Gutter]
    span?: number
}

const CommonForm: React.FC<CommonFormProps> = ({
    items,
    children,
    initialValues,
    onFinish,
    className,
    buttonText,
    buttonClassName,
    gutter = 24,
    span = 24
}) => {
    const [form] = Form.useForm()

    const renderInput = useCallback((item: Item) => {
        switch (item.inputType) {
            case InputType.Select:
                return (
                    <Select size="large" placeholder={item.placeholder}>
                        {item.options?.map((option, index) => (
                            <Select.Option key={index} value={option.value}>
                                {option.label}
                            </Select.Option>
                        ))}
                    </Select>
                )
            case InputType.Date:
                return <DatePicker className="w-full" size="large" />
            default:
                return <Input size="large" {...item} />
        }
    }, [])

    return (
        <Form className={className} layout="vertical" form={form} onFinish={onFinish} initialValues={initialValues}>
            <Row gutter={gutter}>
                {items.map((item, index) => (
                    <Col className="gutter-row" span={span} key={index}>
                        <Form.Item rules={item.rules} name={item.name} label={item.label}>
                            {renderInput(item)}
                        </Form.Item>
                    </Col>
                ))}
            </Row>

            <Form.Item>
                {children ? (
                    children
                ) : (
                    <Button className={buttonClassName} type="primary" size="large" htmlType="submit">
                        {buttonText}
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}

export default CommonForm
