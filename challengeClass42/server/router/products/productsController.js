import { createProduct, getAllProducts, getProductById, deleteProductById, updateProduct} from '../../dto/productsControllers.js'
import { logger } from '../../log/winston.js'

const getProducts = async (req, res, id) => {
    try{
        if(id) {
            const product = await getProductById(id)
            res.json(product )
            return
        }
        const products = await getAllProducts()
        res.json(products)
    }catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const productControllerGetAdmin = async (req, res) => {
    const { id } = req.params
    await getProducts(req, res, id)
}

export const productControllerGet = async (req, res) => {
    const { id } = req.params
    await getProducts(req, res, id)

}

export const productControllerPost = async (req, res) => {
    try{
        const { admin } = req.user
        const product = req.body

        if(!admin) {
            res.status(403).json({'message': `route invalid. This route is for only admin`})
            return
        }

        const timeStamp = new Date().toLocaleString()
        const data = { timeStamp, ...product }
        const request = await createProduct(data)
        res.json({'data': request, 'message': 'It product is added in list'})
    }catch(error) {
        logger.error(`error: ${error.message}`)
    }
}

export const productControllerPut = async (req, res) => {
    try{
        const { id } = req.params
        const { admin } = req.user

        if(!admin) {
            res.status(403).json({ "error": `route invalid. This route is for only admin`})
        }

        const timeStamp = new Date().toLocaleString()
        const product = {...req.body, timeStamp }
        await updateProduct(id, product)
        res.json({'data': product, "message": 'The product was modified'})
    } catch(error) {
        res.status(400)
        logger.error(`error: ${error.message}`)
    }
}

export const productControllerDelete = async (req, res) => {    
    try{ 
        const { id } = req.params
        const { admin } = req.user

        if(!admin) {
            res.status(403).json({ "error": `route invalid. This route is for only admin`})
        }

        const request = await deleteProductById(id)
        res.json({'message':`It product with id: ${id}, is deleted`})

    }catch(error){
        logger.error(`error: ${error.message}`)
    }
}