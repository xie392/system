import React from 'react'
import { Table as AntTable } from 'antd'
import type { TableColumnsType } from 'antd'

interface DataType {
    key: React.Key
    name: string
    age: number
    address: string
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: (text: string) => <a>{text}</a>
    },
    {
        title: 'Age',
        dataIndex: 'age'
    },
    {
        title: 'Address',
        dataIndex: 'address'
    }
]

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park'
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park'
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park'
    },
    {
        key: '4',
        name: 'Disabled User',
        age: 99,
        address: 'Sydney No. 1 Lake Park'
    }
]

const Table: React.FC = () => {
    return (
        <AntTable
            rowSelection={{
                type: 'checkbox'
            }}
            columns={columns}
            dataSource={data}
        />
    )
}

export default Table
