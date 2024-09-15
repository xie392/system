import type { Student } from '@/interface/model/student'
import { InfoMutationType } from '@/lib/enum'
import { createPersistStore } from '@/lib/store'

interface InfoState {
    student: Student
    type: InfoMutationType
}

export const defaultStudent: Student = {
    sno: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    date: '1999-01-01',
    gender: '',
    age: '',
    avatar: ''
}

const initialState: InfoState = {
    student: defaultStudent,
    type: InfoMutationType.Add
}

export const useInfoStore = createPersistStore(initialState, () => ({}), {
    name: 'system-info',
    version: 1
})
