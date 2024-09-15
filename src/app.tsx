import { Suspense } from 'react'
import withAuth from './components/auth/with-auth'
import { useRoutes } from 'react-router-dom'
import routes from '~react-pages'
import { Flex, Spin, ConfigProvider, App as AntApp } from 'antd'
import { useConfigStore } from './store/config'
import zhCN from 'antd/es/locale/zh_CN'
import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

const GlobalLoading = () => {
    return (
        <Flex className="w-full h-screen" justify="center" align="center">
            <Spin />
        </Flex>
    )
}

const App = () => {
    const router = useRoutes(routes)
    const theme = useConfigStore((state) => state.theme)

    return (
        <Suspense fallback={<GlobalLoading />}>
            <ConfigProvider theme={theme} locale={zhCN}>
                <AntApp>{router}</AntApp>
            </ConfigProvider>
        </Suspense>
    )
}

const AuthApp = withAuth(App)

export default AuthApp
