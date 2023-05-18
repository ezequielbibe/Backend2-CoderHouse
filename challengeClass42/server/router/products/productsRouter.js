import { Router } from 'express'
import { productControllerGetAdmin, productControllerGet, productControllerPost, productControllerPut, productControllerDelete } from './productsController.js'
import { authMiddleware } from '../../middleware/jwt/handleToken.js'

const productsRouter = Router()

productsRouter.get('/admin/:id?', authMiddleware, productControllerGetAdmin)
productsRouter.get('/:id?', authMiddleware, productControllerGet)
productsRouter.post('/', authMiddleware, productControllerPost)
productsRouter.put('/:id', authMiddleware, productControllerPut)
productsRouter.delete('/:id', authMiddleware, productControllerDelete)

export default productsRouter