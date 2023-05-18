import { Router } from 'express'
import {cartControllerBuy, cartControllerGet, cartControllerPost, cartControllerPostProduct, cartControllerDelete, cartControllerDeleteProduct } from './cartController.js'

const cartRouter = Router()

cartRouter.get('/:id/products', cartControllerGet)
cartRouter.get('/buy', cartControllerBuy)
cartRouter.post('/', cartControllerPost)
cartRouter.post('/:id/products', cartControllerPostProduct)
cartRouter.delete('/:id', cartControllerDelete)
cartRouter.delete('/:id/products/:id_prod', cartControllerDeleteProduct)

export default cartRouter