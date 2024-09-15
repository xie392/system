import React, { useMemo } from 'react'
import { Table as AntTable, Button, Flex, Popconfirm } from 'antd'
import type { TableColumnsType, TableProps as AntTableProps } from 'antd'
import { Student } from '@/interface/model/student'
import { useInfoStore } from '@/store/info'
import { InfoMutationType } from '@/lib/enum'

interface TableProps extends Partial<AntTableProps<Student>> {
    pagination?: Partial<AntTableProps<Student>['pagination']>
    deleteItem?: (sno: string) => void
}

const Table: React.FC<TableProps> = ({ dataSource, pagination, rowSelection, deleteItem, ...props }) => {
    const updateInfoStore = useInfoStore((state) => state.update)

    const columns = useMemo<TableColumnsType<Student>>(
        () => [
            {
                title: '学号',
                dataIndex: 'sno',
                width: 150,
                align: 'center'
            },
            {
                title: '姓名',
                dataIndex: 'name',
                width: 150,
                align: 'center'
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width: 100,
                align: 'center'
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 200,
                align: 'center'
            },
            {
                title: '电话',
                dataIndex: 'phone',
                width: 200,
                align: 'center'
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                width: 200,
                align: 'center'
            },
            {
                title: '性别',
                dataIndex: 'gender',
                align: 'center',
                width: 80,
                render: (gender: string) => {
                    return gender === '1' ? '男' : '女'
                }
            },
            {
                title: '出生日期',
                dataIndex: 'date',
                align: 'center',
                width: 150
            },
            {
                title: '操作',
                dataIndex: 'operation',
                align: 'center',
                fixed: 'right',
                render: (_: any, record: Student) => {
                    const index = dataSource?.findIndex((item) => item.sno === record.sno) || 0
                    return (
                        <Flex>
                            <Button
                                type="link"
                                onClick={() => {
                                    updateInfoStore({ student: record, type: InfoMutationType.Update })
                                }}
                                href="/form"
                                target="_blank"
                            >
                                编辑
                            </Button>
                            <Popconfirm
                                title="确认删除该学生信息？"
                                description="删除后将无法恢复，请谨慎操作！"
                                onConfirm={() => deleteItem && deleteItem(record.sno)}
                                onCancel={() => {}}
                                okText="确定"
                                cancelText="取消"
                            >
                                <Button type="link" danger onClick={() => {}}>
                                    删除
                                </Button>
                            </Popconfirm>

                            <Button
                                type="link"
                                onClick={() => {
                                    console.log('index', index, 'record', record)
                                }}
                                href={`/info/${record.sno}`}
                                target="_blank"
                            >
                                查看
                            </Button>
                        </Flex>
                    )
                }
            }
        ],
        [dataSource, deleteItem, updateInfoStore]
    )

    return (
        <AntTable
            rowSelection={{
                type: 'checkbox',
                ...rowSelection
            }}
            pagination={{
                showQuickJumper: true,
                defaultCurrent: 1,
                ...pagination
            }}
            columns={columns}
            dataSource={dataSource}
            bordered
            {...props}
        />
    )
}

export default Table
