import { MODE, PORT, PRIVATE_KEY, MONGO_ATLAS, MONGO_LOCAL, PERSISTENCE } from './config/environment.js'
import connectToMongoDB from './config/connectToDbMongo.js'
import express from 'express'
import cluster from 'cluster'
import expressSession from 'express-session'
import { engine } from 'express-handlebars'
import passport from 'passport'
import './router/auth/index.js'
import mongoStore from 'connect-mongo'
import { productsRouter, cartRouter, authRouter } from './router/index.js'
import { logger } from './log/winston.js'
import { expressMiddleware } from '@apollo/server/express4'
import { server } from './graphql/server.js'

if(MODE === 'cluster' && cluster.isPrimary){
    logger.info(`Process ${process.pid} is running`)

    for(let i = 0; i < processors.length; i++){
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal)=> {
        logger.info(`Process number ${worker.process.pid} died`)
        cluster.fork()
    })

} else {
    const app = express()
    app.use(express.static('public'))
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(expressSession({
        store: mongoStore.create({ 
            mongoUrl: MONGO_LOCAL,
            ttl: 600,
            autoRemove: 'interval',
            autoRemoveInterval: 0
        }),
        resave: false,
        saveUninitialized: false,
        secret: PRIVATE_KEY,
    }))
    app.use(passport.initialize())
    app.use(passport.session())

    app.engine('handlebars', engine())
    app.set('view engine', 'handlebars')
    app.set('views', './views')

    app.use('/auth', authRouter) 
    app.use('/api/products', productsRouter)
    app.use('/api/cart', cartRouter)

/*     app.all("*",(req, res) => {
        logger.warn(`Invalid route: ${req.originalUrl}, Method: ${req.method}`)
        res.status(404).json({"error": -2, "description": `route ${req.originalUrl} is invalid`})
    }) */

    server.start().then(async ()=> {
        try{
            PERSISTENCE === 'MONGO' ? await connectToMongoDB() : logger.info("Connect to the MemoryDB")
            app.use('/graphql', expressMiddleware(server))
            app.listen(PORT, async () => logger.info(`Listening on port ${PORT}, process ${process.pid}`))
        }catch(error){
            logger.error(error)
        }
    })
}