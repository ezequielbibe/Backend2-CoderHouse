import { ADMIN_EMAIL, ADMIN_NUMBER } from '../../config/environment.js'
import { logger } from '../../log/winston.js'
import { cartMongo, productsMongo } from '../../daos/index.js'
import { handleSendMail } from '../../helpers/sendMail/handleSendMail.js'
import { handleSendMessage } from '../../helpers/sendMessage/handleSendWhatsapp.js'


export const cartControllerBuy = async (req, res) => {
    const user = req.session.passport.user
    const products = (await cartMongo.readOneData({id: user._id})).products
    const text = `hola \n ${JSON.stringify(products, null, 2)}`
    const subject = `Nuevo pedido de: ${user.name} // ${user.email}`
    await handleSendMail(text, subject, ADMIN_EMAIL)
    await handleSendMessage(`${subject} \n ${text}`, ADMIN_NUMBER, true)
    await handleSendMessage(`Hi! ${user.name} \n Your order is being processed. We will contact you soon.\n \n \n MyStore`, user.phone, false)
}

export const cartControllerGet = async (req, res) => {
    try{
        const { id } = req.params
        const cart = await cartMongo.readOneData({id: id})
        res.render('cart', {user: req.session.passport.user, products: cart.products, cart: true})
    }
    catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const cartControllerPost = async (req, res) => {
    try{
        const resp = await cartMongo.readOneData({id: req.session.passport.user._id})
        if(resp){
            res.redirect(`cart/${req.session.passport.user._id}/products`)
            return
        }
        const timeStamp = new Date().toLocaleString()
        const newCart = {id: req.session.passport.user._id ,timeStamp, products: []}
        const response = await cartMongo.createData(newCart)
        res.redirect(`cart/${response.id}/products`)
    }
    catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const cartControllerPostProduct = async (req, res) => {
    try{
        const { id } = req.params
        const prod = await productsMongo.readOneData({_id: id})
        await cartMongo.updateData({ id: req.session.passport.user._id}, {$push: {products: prod }})
        res.json({"status": 200})
    }
    catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const cartControllerDelete = async (req, res) => {
    try{
        const { id } = req.params
        await cartMongo.deleteData({id: id})
        res.json({"status": 200})
    }
    catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const cartControllerDeleteProduct = async (req, res) => {
    const { id, id_prod } = req.params
    try{
        const req = await cartMongo.readOneData({id: id})
        const products = req.products
        const newCart = products.filter(prod => prod._id != id_prod)
        await cartMongo.updateData({id: id}, {$set: {products: newCart}}) 
    }catch(error){
        logger.error(`error: ${error.message}`)
    }
}