import ContainerMariaDB from './containerMariaDB.js'
import connectToMariaDB from '../config/connectToMariaDB.js'
import ContainerMongo from './containerMongoDB.js'
import Messages from '../model/messagesModal.js'
import Users from '../model/usersModal.js'

export const usersMongo = new ContainerMongo(Users)
export const messagesMongo = new ContainerMongo(Messages)
export const productsMariaDB = new ContainerMariaDB(connectToMariaDB, 'products')