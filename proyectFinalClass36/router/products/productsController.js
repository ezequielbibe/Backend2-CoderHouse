import { productsMongo } from '../../daos/index.js'
import { logger } from '../../log/winston.js'

const admin = Boolean(true)


const getProducts = async (req, res, route, id) => {
    try{
        const user = req.session.passport.user
        const list = route === 'products' ? true : false
        if(id) {
            const product = await productsMongo.readOneData(id)
            res.render(route, { product })
            return
        }
        const products = await productsMongo.readAllData()
        res.render(route, { products, user, list })
    }
    catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const productControllerGetAdmin = async (req, res) => {
    const { id } = req.params
    await getProducts(req, res, 'admin', id)
}

export const productControllerGet = async (req, res) => {
    const { id } = req.params
    await getProducts(req, res, 'products', id)
}

export const productControllerPost = async (req, res) => {
    try{
        if(!admin) {
            res.status(403).json({ "error": `route invalid. This route is for only admin`})
            return
        }
        const timeStamp = new Date().toLocaleString()
        const newProd = { timeStamp, ...req.body }
        await productsMongo.createData(newProd)
        res.redirect('/api/products/admin')
    }
    catch(error) {
        logger.error(`error: ${error.message}`)
    }
}

export const productControllerPut = async (req, res) => {
    try{
        if(!admin) {
            res.status(403).json({ "error": `route invalid. This route is for only admin`})
        }
        const { id } = req.params
        const timeStamp = new Date().toLocaleString()
        await productsMongo.updateData(id, { timeStamp, ...req.body })
        res.json({"status": 200})
    }
    catch(error) {
        logger.error(`error: ${error.message}`)
    }
}

export const productControllerDelete = async (req, res) => {
    if(!admin) {
        res.status(403).json({ "error": `route invalid. This route is for only admin`})
    }
    const { id } = req.params
    await productsMongo.deleteData(id)
    res.json({"status": 200})
}