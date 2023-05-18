import { expect } from 'chai'
import { clearProducts, createProduct, deleteProductById, getAllProducts, getProductById, updateProduct } from '../dto/productsControllers.js'

const product = {
    timeStamp: '3/4/2023, 15:00:35',
    prodName: 'Samsung Galaxy A53',
    description: 'Cellphone samsung',
    code: 3893,
    price: 11111,
    photo: 'https://tienda.movistar.com.ar/media/catalog/product/cache/1d01ed3f1ecf95fcf479279f9ae509ad/s/5/s53-negro-dorso.png',
    stock: 2,
}

describe('DTO products controller', () => {

    describe('createProduct', () => {
        beforeEach(() => {
            clearProducts()
        })

        it('Should create product and return product with id', async () => {
            const request = await createProduct(product)
            const request2 = await getProductById(request._id)


            expect(request).to.be.an('object')
            expect(request2).to.be.eq(request)
            expect(request).to.have.any.keys('_id')            
        })
    })

    describe('getProductByID', () => {
        beforeEach(() => {
            clearProducts()
        })

        it('Should return one object if you search a product by id', async () => {
            const newProduct = await createProduct(product)
            const request = await getProductById(newProduct._id)

            expect(request._id).to.be.eq(newProduct._id)
            expect(request).to.be.an('object')
            expect(request).to.have.any.keys('_id', 'timeStamp', 'description', 'code', 'price', 'photo', 'stock')
        })

        it('Should return undefined if no encuentra un producto con esa id', async () => {
            const request = await getProductById('1')

            expect(request).to.be.eq(undefined)
        })

        it('Should return if no tienes un id', async () => {
            const request = await getProductById()

            expect(request).to.be.eq(undefined)
        })
    })

    describe('getAllProducts', () => {
        beforeEach(() => {
            clearProducts()
        })

        it('Should return an array of products', async () => {
            await createProduct(product)
            await createProduct(product)
            const request = await getAllProducts()

            expect(request).to.be.an('array')
            expect(request.length).to.be.eq(2)
        })

        it('Should return empty array if not have products', async () => {
            const request = await getAllProducts()

            expect(request).to.be.an('array')
            expect(request.length).to.be.eq(0)
        })
    })

    describe('updateProduct', () => {
        beforeEach(() => {
            clearProducts()
        })

        it('Should return modifiqued product', async () => {
            const data = await createProduct(product)
            const request = await updateProduct(data._id, {...data, price: 54321})

            expect(request).to.be.an('object')
            expect(request.price).to.be.eq(54321)
        })
    })

    describe('deleteProductById', () => {
        beforeEach(() => {
            clearProducts()
        })

        it('Should delete product by id', async () => {
            const newProduct = await createProduct(product)
            const search = await getProductById(newProduct._id)
            await deleteProductById(newProduct._id)
            const secondSearch = await getProductById(newProduct._id)

            expect(search).to.not.be.eq(undefined)
            expect(secondSearch).to.be.eq(undefined)
        }) 
    })
})