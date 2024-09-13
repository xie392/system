import { useAuthStore } from '@/store/auth'
import { Avatar, Dropdown, MenuProps, Spin } from 'antd'
import { LogOut, User } from 'lucide-react'
import { Outlet } from 'react-router-dom'

const items: MenuProps['items'] = [
    {
        key: '1',
        label: '个人中心',
        icon: <User size={16} />
    },
    {
        key: '2',
        danger: true,
        label: '退出登录',
        icon: <LogOut size={16} />
    }
]

const IndexPage = () => {
    const user = useAuthStore((state) => state.userInfo)
    return (
        <>
            <header className="h-16 flex justify-between items-center md:px-6 px-4 shadow">
                <h2 className="text-xl font-bold text-gray-800">学生管理系统</h2>
                <Dropdown menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Avatar size={32} src={user?.avatar} />
                    </a>
                </Dropdown>
            </header>
            <Spin className="mt-16" tip="加载中..." spinning={!user}>
                <div className="min-h-[calc(100vh-64px)] md:p-6 p-4">
                    <Outlet />
                </div>
            </Spin>
        </>
    )
}

export default IndexPage
