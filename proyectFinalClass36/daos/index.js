import ContainerMongoDB from "./containerMongoDB.js"
import { Carts, Products, Users} from '../model/index.js'
//import ContainerFirebase from "./containerFireBase.js"

export const cartMongo = new ContainerMongoDB(Carts)
export const productsMongo = new ContainerMongoDB(Products)
export const usersMongo = new ContainerMongoDB(Users)

/* export const cartFirebase = new ContainerFirebase('carts')
export const productsFirebase = new ContainerFirebase('products') */