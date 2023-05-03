import { expect } from 'chai'
import { getProductById } from '../dto/productsControllers.js'


describe('DTO products controller', () => {

    describe('getProductByID', () => {
        it('Should return one object if you search product by id', async () => {
            const data = await getProductById('642b144320bbed9474103ca1')
            expect(data).to.be.an('object')
            expect(data).to.have.property('_id', '642b144320bbed9474103ca1')
        })
    })
})