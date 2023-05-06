import { daoUsers } from "../dao/index.js"

export const createUser = async (data) => {
    try{
        const req = daoUsers.createData(data)
        return req
    }catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const getAllUsers = async () => {
    try{
        const req = await daoUsers.readAllData()
        return req
    }catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const getUserByEmail = async (email) => {
    try{
        const req = await daoUsers.readOneData('email', email)
        return req
    }catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const clearUsers = async () => {
    await daoUsers.clearData()
}
