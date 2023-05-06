import { createProduct, getAllProducts, getProductById, deleteProductById} from '../../dto/productsControllers.js'
import { logger } from '../../log/winston.js'

const getProducts = async (req, res, route, id) => {
    try{
        const user = req.session.passport.user
        const list = route === 'products' ? true : false
        if(id) {
            const product = await getProductById(id)
            res.render(route, { product })
            return
        }
        const products = await getAllProducts()
        res.render(route, { products, user, list })
    }catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const productControllerGetAdmin = async (req, res) => {
    const { id } = req.params
    await getProducts(req, res, 'admin', id)
}

export const productControllerGet = async (req, res) => {
    const { id } = req.params
    /* await getProducts(req, res, 'products', id) */
    res.status(200)
}

export const productControllerPost = async (req, res) => {
    try{
        const { admin } = req.session.passport.user
        const product = req.body

        if(!admin) {
            res.status(403).json({ "error": `route invalid. This route is for only admin`})
            return
        }

        const timeStamp = new Date().toLocaleString()
        const data = { timeStamp, ...product }
        const request = await createProduct(data)
        res.redirect('/api/products/admin')
    }catch(error) {
        logger.error(`error: ${error.message}`)
    }
}

export const productControllerPut = async (req, res) => {
    try{
        const { id } = req.params
        const { admin } = req.session.passport.user

        if(!admin) {
            res.status(403).json({ "error": `route invalid. This route is for only admin`})
        }

        const timeStamp = new Date().toLocaleString()
        const product = {...req.body, timeStamp }
        const request = await updateProduct(id, id, product)
        res.json({"status": 200})
    } catch(error) {
        logger.error(`error: ${error.message}`)
    }
}

export const productControllerDelete = async (req, res) => {    
    try{ 
        const { admin } = req.session.passport.user
        const { id } = req.params

        if(!admin) {
            res.status(403).json({ "error": `route invalid. This route is for only admin`})
        }

        const request = await deleteProductById(id)
        res.json({"status": 200})

    }catch(error){
        logger.error(`error: ${error.message}`)
    }
}