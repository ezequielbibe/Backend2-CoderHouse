import { daoCart } from "../dao/index.js"
import { logger } from "../log/winston.js"

export const createCart = async (data) => {
    try{
        const req = await daoCart.createData(data)
        return req
    }catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const getCartById = async (id) => {
    try{
        const req = await daoCart.readOneData('id', id)
        return req
    }
    catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const getProductsCartById = async (id) => {
    try{
        const req = await daoCart.readOneData('id', id)
        return req.products
    }
    catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const addProductCartById = async (id, product) => {
    try{
        const cart = await daoCart.readOneData('id', id)
        cart['products'].push(product)
        const req = await daoCart.updateData('id', id, cart)
        await req
    }catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const clearCart = async (id) => {
    try{
        const cart = await daoCart.readOneData('id', id)
        cart['products'] = []
        const req = await daoCart.updateData('id', id, cart)
        return req
    }catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const removeProductCart = async (id, _id) => {
    const cart = await daoCart.readOneData('id', id)
    cart['products'].filter(prod => prod._id != _id)
    const req = await daoCart.updateData('id', id, cart)
    return req
}