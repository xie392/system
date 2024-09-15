import { useAuthStore } from '@/store/auth'
import { useConfigStore } from '@/store/config'
import { Avatar, Dropdown, MenuProps, Spin } from 'antd'
import { LogOut, User } from 'lucide-react'
import { useMemo } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const IndexPage = () => {
    const user = useAuthStore((state) => state.userInfo)
    const loading = useConfigStore((state) => state.loading)
    const navigate = useNavigate()

    const items = useMemo<MenuProps['items']>(
        () => [
            {
                key: '1',
                label: '个人中心',
                icon: <User size={16} />,
                onClick: () => navigate(`/info/${user?.sno}`)
            },
            {
                key: '2',
                danger: true,
                label: '退出登录',
                icon: <LogOut size={16} />,
                onClick: () => useAuthStore.getState().logout()
            }
        ],
        [navigate, user]
    )

    return (
        <>
            <header className="sticky top-0 z-10 bg-white h-16 flex justify-between items-center md:px-6 px-4 shadow">
                <Link to="/">
                    <h2 className="text-xl font-bold text-gray-800">学生管理系统</h2>
                </Link>
                <Dropdown menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Avatar size={32} src={user?.avatar} />
                    </a>
                </Dropdown>
            </header>
            <Spin className="mt-16" tip="加载中..." spinning={loading}>
                <div className="container min-h-[calc(100vh-64px)] md:p-6 p-4 max-w-screen-[1920px]">
                    <Outlet />
                </div>
            </Spin>
        </>
    )
}

export default IndexPage
