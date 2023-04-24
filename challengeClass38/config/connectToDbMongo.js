import mongoose from "mongoose"
import { logger } from '../log/winston.js'
import { mongoAtlas } from '../config/environment.js'

let isConnected

const connectToMongoDB = async () => {
    if(!isConnected) {
        logger.info(`Connection is ready`)
        await mongoose.connect(`${mongoAtlas}`)
        isConnected = true
        return
    }
    logger.warn(`Connetion existing`)
}

export default connectToMongoDB