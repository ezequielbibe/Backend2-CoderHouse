import { mongoAtlas, PORT, MODE, processors } from './config/environment.js'
import express from 'express'
import cluster from 'cluster'
import { engine } from 'express-handlebars'
import { createServer } from 'http'
import expressSession from 'express-session'
import mongoStore from 'connect-mongo'
import { routerAuth, routerRandomNumbers, routerInfo } from './router/index.js'
import { socket } from './socket/socket.js'
import { Server } from 'socket.io'
import passport from 'passport'
import './router/auth/index.js'


if(cluster.isPrimary && MODE === 'cluster'){
    console.log(`Process ${process.pid} is running`)

    for(let i = 0; i < processors.length; i++){
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal)=> {
        console.log(`Process number ${worker.process.pid} died`)
        cluster.fork()
    })

} else {
    const app = express()
    const server = createServer(app)
    const io = new Server(server)

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(expressSession({
        store: mongoStore.create({ 
            mongoUrl: mongoAtlas,
            ttl: 600,
            autoRemove: 'interval',
            autoRemoveInterval: 0
        }),
        resave: false,
        saveUninitialized: false,
        secret: 'my-super-secret',
    }))
    app.use(passport.initialize())
    app.use(passport.session())

    app.engine('handlebars', engine())
    app.set('view engine', 'handlebars')
    app.set('views', './views')
    
    const middleWareSession = (req, res, next) => {
        if(req.session.passport) next()
        if(!req.session.passport) res.redirect('/auth/login')
    }

    app.use('/auth', routerAuth)
    app.use('/api/randoms', routerRandomNumbers)
    app.use('/info', routerInfo)
    app.get('/', middleWareSession,(req, res) => {
        res.render('home', { userName: req.session.passport.user.email})
    })

    app.all("*",(req, res) => {
        const route = req.params
        res.status(404).json({"error": -2, "description": `route ${route[0]} is invalid`})
    })
    io.on('connection', socket)

    server.listen(PORT, ()=> console.log(`listening on port ${PORT}, process ${process.pid}`))
}