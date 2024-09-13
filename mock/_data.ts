import { faker } from '@faker-js/faker'

const data = Array.from({ length: 10 }, (_, index) => ({
    sno: `test-${index + 1}`,
    password: '123456qq',
    name: faker.person.firstName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    date: faker.date.past(),
    gender: faker.number.int({ min: 0, max: 1 }),
    age: faker.number.int({ min: 6, max: 65 }),
    avatar: faker.image.avatar()
}))

export const defaultUsers = data
