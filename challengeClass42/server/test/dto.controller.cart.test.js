import { expect } from 'chai'
import { addProductCartById, clearAllCarts, clearCart, createCart, getCartById, getProductsCartById, removeProductCart } from '../dto/cartControllers.js'

const prod = {
    _id: '2',
    timeStamp: '3/4/2023, 15:00:35',
    prodName: 'Samsung Galaxy A53',
    description: 'Cellphone samsung',
    code: 3893,
    price: 11111,
    photo: 'https://tienda.movistar.com.ar/media/catalog/product/cache/1d01ed3f1ecf95fcf479279f9ae509ad/s/5/s53-negro-dorso.png',
    stock: 2,
}
const newCart = { 
    id: '1', 
    timeStamp: '4/5/2023', 
    products: [prod]
}

describe('DTO carts controller', () => {

    describe('createCart', () => {
        beforeEach(() => {
            clearAllCarts()
        })

        it('Should create and return an new cart with id', async () => {
            const request = await createCart(newCart)

            expect(request).to.be.an('object')
            expect(request).to.have.an.keys('_id', 'id', 'timeStamp','products')
        })
    })

    describe('getCartsById', () => {
        beforeEach(()=> {
            clearAllCarts()
        })

        it('Should return an one cart with id ', async () => {
            const data = await createCart(newCart)
            const request = await getCartById(data.id)

            expect(request).to.be.an('object')
            expect(request).to.be.eq(data)
        })

        it('Should return undefined if not have cart or not have cart id', async () => {
            const request = await getCartById('2')
            const request2 = await getCartById()

            expect(request).to.be.eq(undefined)
            expect(request2).to.be.eq(undefined)
        })
    })

    describe('getProductsCartById', () => {
        beforeEach(()=> {
            clearAllCarts()
        })

        it('Should return an array of objects', async () => {
            await createCart(newCart)
            const request = await getProductsCartById(newCart.id)
            
            expect(request).to.be.an('array')
            expect(request.length).to.be.eq(1)
            expect(request[0]).to.have.an.keys('_id', 'timeStamp', 'prodName', 'description', 'code', 'price', 'photo', 'stock')
        })

        it('Should return undefined if not have id or id is not correct', async () => {
            const request = await getProductsCartById()
            const request2 = await getProductsCartById('2')

            expect(request).to.be.eq(undefined)
            expect(request2).to.be.eq(undefined)
        })
    })

    describe('addProductCartById', () => {

        beforeEach(() => {
            clearAllCarts()
        })

        it('Should add product in cart by id', async () => {
            await createCart(newCart)
            const newProd = {...prod, prodName: 'Samsung Galaxy Note', price: 123}
            await addProductCartById(newCart.id, newProd)
            const request = await getProductsCartById(newCart.id)

            expect(request).to.be.an('array')
            expect(request.length).to.be.eq(2)
            expect(request[1]).to.be.an('object')
            expect(request[1]).to.be.eq(newProd)
        })
    })

    describe('clearCart', () => {

        beforeEach(()=>{
            clearAllCarts()
        })

        it('Should empty products in cart by id', async () => {
            await createCart(newCart)
            await clearCart(newCart.id)
            const request = await getProductsCartById(newCart.id)

            expect(request).to.be.an('array')
            expect(request.length).to.be.eq(0)
        })
    })

    describe('removeProductCart', () => {

        beforeEach(() => {
            clearAllCarts()
        })

        it('Should remove product of cart by cart id and product id', async () => {
            await createCart(newCart)
            const request = await removeProductCart(newCart.id, prod._id)

            expect(request.products).to.be.an('array')
            expect(request.products.length).to.be.eq(0)
        })
    })
})