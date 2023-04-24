import mongoose from "mongoose"
import { logger } from '../log/winston.js'
import { MONGO_ATLAS, MONGO_LOCAL } from '../config/environment.js'

let isConnected

const connectToMongoDB = async () => {
    if(!isConnected) {
        logger.info(`Connection is ready`)
        await mongoose.connect(`${MONGO_LOCAL}`)
        isConnected = true
        return
    }
    logger.warn(`Connetion existing`)
}

export default connectToMongoDB