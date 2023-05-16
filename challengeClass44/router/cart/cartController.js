import { ADMIN_EMAIL, ADMIN_NUMBER } from '../../config/environment.js'
import { createCart, getCartById, getProductsCartById, addProductCartById, clearCart } from '../../dto/cartControllers.js'
import { getProductById } from '../../dto/productsControllers.js'
import { handleSendMessage, handleSendMail } from '../../helpers/index.js'
import { logger } from '../../log/winston.js'



export const cartControllerBuy = async (req, res) => {
    try{
        const { name, email, phone, _id } = req.session.passport.user

        const products = await getProductsCartById(_id)
        const text = `hola \n ${JSON.stringify(products, null, 2)}`
        const subject = `Nuevo pedido de: ${name} // ${email}`
    
        await handleSendMail(text, subject, ADMIN_EMAIL)
        await handleSendMessage(`${subject} \n ${text}`, ADMIN_NUMBER, true)
        await handleSendMessage(`Hi! ${name} \n Your order is being processed. We will contact you soon.\n \n \n MyStore`, phone, false)
    }catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const cartControllerGet = async (req, res) => {
    try{
        const { id } = req.params
        const user = req.session.passport.user

        const products = await getProductsCartById(id)
        res.render('cart', { user, products, cart: true })
    }
    catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const cartControllerPost = async (req, res) => {
    try{
        const { _id } = req.session.passport.user

        const cart = await getCartById(_id)
        if(cart){
            res.redirect(`cart/${_id}/products`)
            return
        }

        const timeStamp = new Date().toLocaleString()
        const newCart = { id: _id, timeStamp, products: [] }
        const request = await createCart(newCart)
        res.redirect(`cart/${request.id}/products`)
    }
    catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const cartControllerPostProduct = async (req, res) => {
    try{
        const { _id } = req.session.passport.user
        const { id } = req.params

        const product = await getProductById(id)
        const request = await addProductCartById(_id, product)
        res.json({"status": 200})
    }
    catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const cartControllerDelete = async (req, res) => {
    try{
        const { id } = req.params
        const request = await clearCart(id)
        res.json({"status": 200})
    }
    catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const cartControllerDeleteProduct = async (req, res) => {
    try{
        const { id, id_prod } = req.params
        const request = await removeProductCart(id, id_prod)
        return request
    }catch(error){
        logger.error(`error: ${error.message}`)
    }
}