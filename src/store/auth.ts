import type { Student } from '@/interface/model/student'
import { createPersistStore } from '@/lib/store'

interface AuthState {
    userId: string
    token: string
    userInfo: Student | null
}

const initialState: AuthState = {
    userId: '',
    token: '',
    userInfo: null
}

export const useAuthStore = createPersistStore(initialState, () => ({}), {
    name: 'system-auth',
    version: 1
})
