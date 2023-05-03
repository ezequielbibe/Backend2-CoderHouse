import { logger } from "../log/winston.js"
import randomBytes from "randombytes"

export let users = [
    {
        _id: "64346cf8cea734457210afa8",
        email: 'salinasflorencia11@gmail.com',
        password: '$2b$10$2uC8G5IkBLHqgMtaEdvXNuN94GiPcdxhpI95phVg7pB7gawFosKj2',
        name: 'Florencia Salinas',
        age: 24,
        address: 'misioneros, 355',
        phone: '2915264095',
        avatar: 'sdsadasd',
        admin: false,
        __v: 0
    },
    {
        _id: "642b01c1827448a50251772a",
        email: 'ezequielbibee.dev@gmail.com',
        password: '$2b$10$W5cEYkyzUvH5IpAdvmsMO.grhZnoyZs3vTa8nptgd4MpR22ORnzH2',
        name: 'Ezequiel Bibé',
        age: 24,
        address: 'asdasdsad',
        phone: '123',
        avatar: '123123',
        admin: false,
        __v: 0
    },
    {
        _id: "64335615e5f7df036b5928d3",
        email: 'ezequielbibee@hotmail.com',
        password: '$2b$10$nG3PewBYMlHtRmoqhGmo4O5Q74HrqinhIkYcLOJmO7TRwsu1ZSik.',
        name: 'Ezequiel Bibe',
        age: 24,
        address: 'misioneros 355 depto 2',
        phone: '542914641337',
        avatar: '123123213',
        admin: true,
        __v: 0
    },
] 
export let carts = []
export let products = [
    {
        _id: "642b144320bbed9474103ca1",
        timeStamp: '3/4/2023, 15:00:35',
        prodName: 'Samsung Galaxy A53',
        description: 'Cellphone samsung',
        code: 3893,
        price: 11111,
        photo: 'https://tienda.movistar.com.ar/media/catalog/product/cache/1d01ed3f1ecf95fcf479279f9ae509ad/s/5/s53-negro-dorso.png',
        stock: 2,
        __v: 0
    },
    {
        _id: "642b4567939a55669d96de25",
        timeStamp: '3/4/2023, 18:30:14',
        prodName: 'Motorola Edge 30',
        description: 'Cellphone Motorola',
        code: 112233,
        price: 222222,
        photo: 'https://tienda.movistar.com.ar/media/catalog/product/cache/1d01ed3f1ecf95fcf479279f9ae509ad/e/d/edge30-plata-frente.png',
        stock: 5,
        __v: 0
    },
    {
        _id: "642b49eced99516d4c740311",
        timeStamp: '3/4/2023, 18:49:32',
        prodName: 'Xiaomi Redmi Note 11',
        description: 'Cellphone Xiaomi',
        code: 23131,
        price: 333333,
        photo: 'https://tienda.movistar.com.ar/media/catalog/product/cache/1d01ed3f1ecf95fcf479279f9ae509ad/r/e/redmi-black-frente_1.png',
        stock: 7,
        __v: 0
    },
    {
        _id: "642b4a55159b4fee321346a6",
        timeStamp: '3/4/2023, 18:51:17',
        prodName: 'Samsung Galaxy A33',
        description: 'Cellphone samsung',
        code: 123333,
        price: 44444444,
        photo: 'https://http2.mlstatic.com/D_NQ_NP_979874-MLA51000508349_082022-O.webp',
        stock: 2,
        __v: 0
    }
]


class ContainerMemory {
    constructor(model){
        this.model = model
    }

    createData (data){
        try{
            const req = this.model.push({...data, _id: randomBytes(16)})
            return req
        }
        catch(error){
            logger.error(`error: ${error.message}`)
        }
    }

    readAllData () {
        try{
            const req = this.model
            return req
        }
        catch(error){
            logger.error(`error: ${error.message}`)
        }
    }

    readOneData (key, value) {
        try{
            const req = this.model.find(data => data[key] === value)
            return req
        }
        catch(error){
            logger.error(`error: ${error.message}`)
        }
    }

    updateData(key, value, data) {
        try{
            const index = this.model.findIndex(x => x[key] === value)
            const req = this.model[index] = data
            return req
        }
        catch(error){
            logger.error(`error: ${error.message}`)
        }
    }

    deleteData (key, value) {
        try{
            const req = this.model.filter(x => x[key] != value)
            return req
        }
        catch(error){
            logger.error(`error: ${error.message}`)
        }
    }
}

export default ContainerMemory