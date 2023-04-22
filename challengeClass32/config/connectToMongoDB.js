import mongoose from 'mongoose'
import { mongoAtlas, mongoLocal } from './environment.js'

const connectToDB = async () => {
    try{
        if(mongoose.connection.readyState == 0) {
            await mongoose.connect('mongodb://0.0.0.0:27017/challengeClass22')
            return
        }
    } catch(error){
        console.log(`We has problems: ${error}`)
    }
}

export default connectToDB