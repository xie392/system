import { GetStudentApi } from '@/http/student'
import { Student } from '@/interface/model/student'
import { generateId } from '@/lib/utils'
import { Avatar, Descriptions, DescriptionsProps } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

const InfoPage = () => {
    const { id } = useParams()
    const [student, setStudent] = useState<Student>()

    const items = useMemo<DescriptionsProps['items']>(() => {
        if (!student) return []
        return [
            {
                key: generateId(),
                label: '学号',
                children: student?.sno
            },
            {
                key: generateId(),
                label: '姓名',
                children: student?.name
            },
            {
                key: generateId(),
                label: '电话',
                children: student?.phone
            },
            {
                key: generateId(),
                label: '邮箱',
                children: student?.email
            },
            {
                key: generateId(),
                label: '地址',
                span: 2,
                children: student?.address
            },
            {
                key: generateId(),
                label: '出生日期',
                children: student?.date
            },
            {
                key: generateId(),
                label: '性别',
                children: student?.gender === '1' ? '男' : '女'
            }
        ]
    }, [student])

    const getStudent = useCallback(async (id: string) => {
        const { data } = await GetStudentApi(id)
        setStudent(data || null)
    }, [])

    useEffect(() => {
        getStudent(id as string)
    }, [getStudent, id])

    return <Descriptions title={<Avatar size={32} src={student?.avatar} />} layout="vertical" items={items} />
}
export default InfoPage
