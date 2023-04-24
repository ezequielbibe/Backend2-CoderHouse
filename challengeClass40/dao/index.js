import { PERSISTENCE } from "../config/environment.js"
import ContainerMongoDB from "./containerMongoDB.js"
import { Carts, Products, Users} from '../Schemas/index.js'
//import ContainerFirebase from "./containerFireBase.js"

const dao = PERSISTENCE === "MONGO" && ContainerMongoDB

export const daoCart = new dao(Carts)
export const daoProducts = new dao(Products)
export const daoUsers = new dao(Users)

/* export const cartFirebase = new ContainerFirebase('carts')
export const productsFirebase = new ContainerFirebase('products') */