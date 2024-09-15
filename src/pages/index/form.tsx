import CommonForm, { Item } from '@/components/common/form'
import { InfoMutationType, InputType } from '@/lib/enum'
import { useInfoStore } from '@/store/info'
import { App, Flex } from 'antd'
import { useBeforeUnload } from 'react-router-dom'
import dayjs from 'dayjs'
import { CreateStudentApi, UpdateStudentApi } from '@/http/student'
import { CHANNEL_NAME } from '@/lib/constant'
import { useEffect, useMemo, useState } from 'react'
import { useConfigStore } from '@/store/config'

const items: Item[] = [
    {
        type: 'text',
        name: 'name',
        placeholder: '姓名',
        rules: [{ required: true, message: '请姓名' }],
        label: '姓名'
    },
    {
        type: 'text',
        name: 'email',
        placeholder: '邮箱',
        rules: [{ required: false }, { type: 'email', message: '请输入正确的邮箱格式' }],
        label: '邮箱'
    },
    {
        type: 'text',
        name: 'phone',
        placeholder: '电话',
        rules: [{ required: true, message: '请输入电话' }],
        label: '电话'
    },
    {
        type: 'text',
        name: 'address',
        placeholder: '地址',
        rules: [{ required: true, message: '请输入地址' }],
        label: '地址'
    },
    {
        name: 'date',
        placeholder: '出生日期',
        rules: [{ required: true, message: '请选择出生日期' }],
        label: '出生日期',
        inputType: InputType.Date
    },
    {
        name: 'gender',
        placeholder: '性别',
        rules: [{ required: true, message: '请选择性别' }],
        label: '性别',
        inputType: InputType.Select,
        options: [
            { label: '男', value: '1' },
            { label: '女', value: '0' }
        ]
    }
]

const FormPage = () => {
    const student = useInfoStore((state) => state.student)
    const type = useInfoStore((state) => state.type)
    const updateInfo = useInfoStore((state) => state.update)
    const updateConfig = useConfigStore((state) => state.update)

    const { message } = App.useApp()

    const channel = useMemo<BroadcastChannel>(() => new BroadcastChannel(CHANNEL_NAME), [])

    const [isBeforeUnload, setIsBeforeUnload] = useState(true)

    useBeforeUnload((event) => {
        if (isBeforeUnload) {
            event.preventDefault()
            event.returnValue = ''
        }
    })

    const onFinish = async (values: any) => {
        setIsBeforeUnload(false)
        values.date = dayjs(values.date).format('YYYY-MM-DD')
        // return
        const { code, data, msg } =
            type === InfoMutationType.Add ? await CreateStudentApi(values) : await UpdateStudentApi(values, student.sno)

        if (code !== 200) {
            setIsBeforeUnload(true)
            message.error(msg)
            return
        }

        const newStudent = { ...student, ...data }
        if (type === InfoMutationType.Update) {
            updateInfo({ student: newStudent })
        }
        // 通知其他页面刷新
        channel.postMessage({ type, data: newStudent })
        // 关闭当前页面
        window.close()
    }

    useEffect(() => {
        updateConfig({ loading: false })
    }, [updateConfig])

    return (
        <Flex justify="center" align="center">
            <CommonForm
                className="w-full"
                items={items}
                onFinish={onFinish}
                initialValues={{
                    ...student,
                    date: dayjs(student.date, 'YYYY-MM-DD')
                }}
                buttonText={type === InfoMutationType.Add ? '添加' : '修改'}
                buttonClassName="mx-auto"
                span={12}
            />
        </Flex>
    )
}

export default FormPage
