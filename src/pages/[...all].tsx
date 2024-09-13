import { Button, Flex, Result } from 'antd'

const NotFoundPage = () => {
    return (
        <Flex className="h-screen w-full" align="center" justify="center">
            <Result
                status="404"
                title="404"
                subTitle="找不到页面"
                extra={
                    <Button type="link" href="/">
                        返回首页
                    </Button>
                }
            />
        </Flex>
    )
}

export default NotFoundPage
