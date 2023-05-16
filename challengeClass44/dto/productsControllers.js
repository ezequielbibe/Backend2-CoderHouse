import { daoProducts } from "../dao/index.js"
import { logger } from "../log/winston.js"

export const createProduct = async (data) => {
    try{
        const req = await daoProducts.createData(data)
        return req
    }catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const getProductById = async (id) => {
    try{
        const req = await daoProducts.readOneData("_id", id)
        return req
    }catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const getAllProducts = async () => {
    try{
        const req = await daoProducts.readAllData()
        return req
    }catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const updateProduct = async (_id, product) => {
    try{
        const req = await daoProducts.updateData('_id', _id, product)
        return req
    }catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const deleteProductById = async (_id) => {
    try{
        const req = await daoProducts.deleteData('_id', _id)
        return req
    }catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const clearProducts = () => {
    daoProducts.clearData()
}