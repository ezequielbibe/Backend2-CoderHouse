import { PERSISTENCE } from "../config/environment.js"
import ContainerMongoDB from "./containerMongoDB.js"
import ContainerMemory from "./containerMemory.js"
import { Carts, Products, Users} from '../Schemas/index.js'
import { carts, products, users } from "./containerMemory.js"
import { logger } from "../log/winston.js"
//import ContainerFirebase from "./containerFireBase.js"

const dao = PERSISTENCE === "MONGO" ? ContainerMongoDB : ContainerMemory

export const daoCart = new dao(PERSISTENCE === "MONGO" ? Carts : carts)
export const daoProducts = new dao(PERSISTENCE === "MONGO" ? Products : products)
export const daoUsers = new dao(PERSISTENCE === "MONGO" ? Users : users)


PERSISTENCE === 'MONGO' ? logger.info('API initializated with DAO on MongoDB') : logger.info('API initializated with DAO on Memory')

/* export const cartFirebase = new ContainerFirebase('carts')
export const productsFirebase = new ContainerFirebase('products') */