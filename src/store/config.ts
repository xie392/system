import { createPersistStore } from '@/lib/store'
import { getRootVar } from '@/lib/utils'
import { ThemeConfig } from 'antd'

interface ConfigState {
    theme: Partial<ThemeConfig>
}

const initialState: ConfigState = {
    theme: {
        token: {
            colorPrimary: getRootVar<string>('primary'),
            borderRadius: 4
        }
    }
}

export const useConfigStore = createPersistStore(initialState, () => ({}), {
    name: 'system-config',
    version: 1
})
