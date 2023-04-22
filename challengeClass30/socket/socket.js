import mongoose from 'mongoose'
import { productsMariaDB, messagesMongo } from '../daos/index.js'
import { connectToMongoDB } from '../config/index.js'

let products = []

export const socket = async (client)=> {
    try{
        console.log(`${client.id} is connected`)

        products = await productsMariaDB.getData()
        client.emit('products', products)

        await connectToMongoDB()
        const messages = await messagesMongo.getData()
        client.emit('messageToChat', messages)
        await mongoose.disconnect()


        client.on('addProduct',async data => {
            try{
                productsMariaDB.insertData(data)
                products = await productsMariaDB.getData()
                client.emit('products', products)
            }
            catch(error){
                console.log(`We has problems1: ${error}`)
            }
        })
        client.on('addMessage', async data =>{
            try{
                await connectToMongoDB()
                await messagesMongo.createData(data)
                const messagesActualizated = await messagesMongo.getData()
                await mongoose.disconnect()
                client.emit('messageToChat', messagesActualizated)
            }
            catch(error){
                console.log(`We has problems: ${error}`)
            }
        })
    }
    catch(error){
        console.log(`We has problems: ${error}`)
    }
}