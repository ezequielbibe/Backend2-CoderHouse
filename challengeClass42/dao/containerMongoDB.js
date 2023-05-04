import { logger } from "../log/winston.js"

class ContainerMongoDB {
    constructor(model){
        this.model = model
    }

    async createData (data) {
        try{
            const req = new this.model(data)
            logger.info(`Data created`)
            return await req.save()
        }
        catch(error){
            logger.error(`error: ${error.message}`)
        }
    }

    async readAllData () {
        try{
            const req = await this.model.find({}, {"_id": 1, "__v": 0}).lean();
            return req
        }
        catch(error){
            logger.error(`error: ${error.message}`)
        }
    }

    async readOneData (key, value) {
        try{
            const query = {}
            query[key] = value
            const req = await this.model.findOne(query).lean();
            return req
        }
        catch(error){
            logger.error(`error: ${error.message}`)
        }
    }
    
    async updateData (key, value, data) {
        try{
            const query = {}
            query[key] = value
            const req = await this.model.findOneAndUpdate(query, {$set: data})
            return req
        }
        catch(error){
            logger.error(`error: ${error.message}`)
        }
    }

    async deleteData (key, value) {
        try{
            const query = {}
            query[key] = value
            const req = await this.model.findOneAndDelete(query)
            logger.info("deleted")
            return req
        }
        catch(error){
            logger.error(`error: ${error.message}`)
        }
    } 
}

export default ContainerMongoDB