import { logger } from "../log/winston.js"

class ContainerMongoDB {
    constructor(model){
        this.model = model
    }

    async createData (data) {
        try{
            const newData = new this.model(data)
            logger.info(`Data created`)
            return await newData.save()
        }
        catch(error){
            logger.error(`error: ${error.message}`)
        }
    }

    async readAllData () {
        try{
            const data = await this.model.find({}, {"_id": 1, "__v": 0}).lean();
            //console.log(JSON.stringify(data, null, 2))
            return data
        }
        catch(error){
            logger.error(`error: ${error.message}`)
        }
    }

    async readOneData (obj) {
        try{
            const data = await this.model.findOne(obj).lean();
            return data
        }
        catch(error){
            logger.error(`error: ${error.message}`)
        }
    }
    
    async updateData (ref, data) {
        try{
            await this.model.findOneAndUpdate(ref, data)
        }
        catch(error){
            logger.error(`error: ${error.message}`)
        }
    }

    async deleteData (data) {
        try{
            await this.model.findOneAndDelete(data)
            logger.info("deleted")
        }
        catch(error){
            logger.error(`error: ${error.message}`)
        }
    } 
}

export default ContainerMongoDB