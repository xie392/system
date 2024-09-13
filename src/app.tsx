import { Suspense } from 'react'
import withAuth from './components/auth/with-auth'
import { useRoutes } from 'react-router-dom'
import routes from '~react-pages'
import { Flex, Spin, ConfigProvider } from 'antd'
import { useConfigStore } from './store/config'

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
            <ConfigProvider theme={theme}>{router}</ConfigProvider>
        </Suspense>
    )
}

const AuthApp = withAuth(App)

export default AuthApp
