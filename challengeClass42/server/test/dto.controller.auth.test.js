import { expect } from 'chai'
import { clearUsers, createUser, getAllUsers, getUserByEmail } from '../dto/authController.js'

const newUser = {
    email: 'salinasflorencia11@gmail.com',
    password: '$2b$10$2uC8G5IkBLHqgMtaEdvXNuN94GiPcdxhpI95phVg7pB7gawFosKj2',
    name: 'Florencia Salinas',
    age: 24,
    address: 'ejemplo',
    phone: '1231321',
    avatar: 'sdsadasd',
    admin: false,
}

describe('DTO auth Controller', () => {

    describe('createUser', () => {

        beforeEach(() => {
            clearUsers()
        })

        it('Should create and return user', async () => {
            const request = await createUser(newUser)
            const verify = await getUserByEmail(newUser.email)

            expect(request).to.be.an('object')
            expect(request).to.have.an.keys('_id', 'email', 'password', 'name', 'age', 'address', 'phone', 'avatar', 'admin')
            expect(verify).to.be.eq(request)
        })
    })

    describe('getAllUsers', () => {
        
        beforeEach(() => {
            clearUsers()
        })

        it('Should return all users',async () => {
            await createUser(newUser)
            await createUser(newUser)
            const request = await getAllUsers()

            expect(request).to.be.an('array')
            expect(request.length).to.be.eq(2)

        })

        it('Should return an empty array if not have users', async () => {
            const request = await getAllUsers()

            expect(request).to.be.an('array')
            expect(request.length).to.be.eq(0)
        })
    })

    describe('getUserByEmail', () => {

        beforeEach(() => {
            clearUsers()
        })

        it('Should return an one user by email', async () => {
            await createUser(newUser)
            const request = await getUserByEmail(newUser.email)

            expect(request).to.be.an('object')
            expect(request).to.have.an.keys('_id', 'email', 'password', 'name', 'age', 'address', 'phone', 'avatar', 'admin')
        })

        it('Should return undefined if not have id or id is not correct', async () => {
            const request = await getUserByEmail('error@gmail.com')
            const request2 = await getUserByEmail()

            expect(request).to.be.eq(undefined)
            expect(request2).to.be.eq(undefined)
        })
    })
})