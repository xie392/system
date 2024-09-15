import { faker } from '@faker-js/faker'
import { formatDate } from './_utils'

const data = Array.from({ length: 100 }, (_, index) => ({
    sno: `test-${index + 1}`,
    password: '123456qq',
    name: faker.person.firstName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    date: formatDate(faker.date.past()),
    gender: faker.number.int({ min: 0, max: 1 }).toString(),
    age: faker.number.int({ min: 6, max: 65 }),
    avatar: faker.image.avatar()
}))

export const defaultUsers = data
