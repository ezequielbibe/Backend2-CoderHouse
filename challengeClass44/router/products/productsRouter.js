import { Router } from 'express'
import { productControllerGetAdmin, productControllerGet, productControllerPost, productControllerPut, productControllerDelete } from './productsController.js'

const productsRouter = Router()

productsRouter.get('/admin/:id?', productControllerGetAdmin)
productsRouter.get('/:id?', productControllerGet)
productsRouter.post('/', productControllerPost)
productsRouter.put('/:id', productControllerPut)
productsRouter.delete('/:id', productControllerDelete)

export default productsRouter