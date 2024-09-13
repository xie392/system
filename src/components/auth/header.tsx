import { Flex } from 'antd'
import { ArrowRight } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

interface AuthHeaderProps {
    type: 'sign-in' | 'sign-up'
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ type }) => {
    const isSignIn = useMemo(() => type === 'sign-in', [type])

    return (
        <Flex className="pb-10 space-y-2 container" vertical align="center">
            <h1 className="text-2xl font-bold">{isSignIn ? '登录' : '注册'}</h1>
            <p className="flex">
                <span>{isSignIn ? '还没有账号？' : '已有账号？'}</span>
                <Link
                    className="link flex items-center space-x-1"
                    to={{ pathname: isSignIn ? '/sign-up' : '/sign-in' }}
                >
                    {isSignIn ? '注册' : '登录'}
                    <ArrowRight className="size-4" />
                </Link>
            </p>
        </Flex>
    )
}

export default AuthHeader
