import Table from '@/components/table'
import { DeleteStudentApi, GetStudentsApi } from '@/http/student'
import { PageParams } from '@/interface/http/student'
import { Student } from '@/interface/model/student'
import { CHANNEL_NAME } from '@/lib/constant'
import { InfoMutationType } from '@/lib/enum'
import { defaultStudent, useInfoStore } from '@/store/info'
import { App, Button, Flex, Input, Space } from 'antd'
import { Plus, Trash2 } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

const IndexPage = () => {
    const [students, setStudents] = useState<Student[]>([])
    const [total, setTotal] = useState(0)
    const [keyword, setKeyword] = useState('')
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const updateInfo = useInfoStore((state) => state.update)
    const { message, modal } = App.useApp()

    const getStudentList = useCallback(async () => {
        const params: PageParams = keyword ? { keyword } : {}
        params.page = page
        params.pageSize = pageSize
        const { data } = await GetStudentsApi(params)
        setStudents(data?.list || [])
        setTotal(Number(data?.total || 0))
    }, [keyword, page, pageSize])

    useEffect(() => {
        // 如果上一次请求没有结束就又触发了请求，则取消上一次请求
        getStudentList()
    }, [getStudentList, keyword])

    // 接收来自子页面的消息
    const channel = useMemo(() => new BroadcastChannel(CHANNEL_NAME), [])

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            const { type, data } = event.data

            console.log('receive message', event.data)

            if (type === InfoMutationType.Add) {
                setStudents((prev) => [data, ...prev])
                getStudentList()
            }

            if (type === InfoMutationType.Update) {
                setStudents((prev) => prev.map((item) => (item.sno === data.sno ? { ...item, ...data } : item)))
            }
        }

        channel.addEventListener('message', handleMessage)

        return () => {
            channel.removeEventListener('message', handleMessage)
            channel.close()
        }
    }, [channel, getStudentList])

    const deleteItem = async (ids: string[]) => {
        const { code, msg } = await DeleteStudentApi(ids)
        if (code !== 200) return message.error(msg)
        setStudents(students.filter((item) => !ids.includes(item.sno)))
        getStudentList()
        message.success('删除成功')
    }

    const [ids, setIds] = useState<string[]>([])

    const handleDelete = async () => {
        modal.confirm({
            title: '批量删除',
            content: '确定要删除所选学生吗？',
            onOk() {
                deleteItem(ids)
            }
        })
    }

    return (
        <Table
            dataSource={students.map((item) => ({ ...item, key: item.sno }))}
            pagination={{
                onChange: (page, pageSize) => {
                    setPage(page)
                    setPageSize(pageSize)
                    getStudentList()
                },
                total
            }}
            rowSelection={{
                onChange: (selectedRowKeys) => setIds(selectedRowKeys as string[])
            }}
            deleteItem={(sno) => deleteItem([sno])}
            title={() => (
                <Flex justify="space-between" align="center">
                    <Input
                        className="max-w-sm"
                        size="large"
                        placeholder="按姓名或学号搜索"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <Space>
                        <Button
                            type="primary"
                            icon={<Plus size={16} />}
                            onClick={() =>
                                updateInfo({
                                    student: defaultStudent,
                                    type: InfoMutationType.Add
                                })
                            }
                            href="/form"
                            target="_blank"
                        >
                            添加学生
                        </Button>
                        <Button
                            type="primary"
                            danger
                            disabled={!ids.length}
                            icon={<Trash2 size={16} />}
                            onClick={handleDelete}
                        >
                            批量删除
                        </Button>
                    </Space>
                </Flex>
            )}
            scroll={{ y: 350 }}
        />
    )
}
export default IndexPage
