import express from 'express'
import { engine } from 'express-handlebars'
import { createServer } from 'http'
import expressSession from 'express-session'
import mongoStore from 'connect-mongo'
import routerAuth from './router/authRouter.js'
import { socket } from './socket/socket.js'
import { Server } from 'socket.io'
import passport from 'passport'
import './router/auth/index.js'

const app = express()
const PORT = 8080
const server = createServer(app)
const io = new Server(server)

const mongoAtlas = 'mongodb+srv://coderhouse:nICi5z5tVOkztZu4@clusterdb.ewcn9ps.mongodb.net/?retryWrites=true&w=majority'
//const mongoLocal = 'mongodb://0.0.0.0:27017/challengeClass22'

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
app.use(express.static('public'))

const middleWareSession = (req, res, next) => {
    if(req.session.passport) next()
    if(!req.session.passport) res.redirect('/auth/login')
}

app.use('/auth', routerAuth)

app.get('/', middleWareSession,(req, res) => {
    res.render('home', { userName: req.session.passport.user.email})
})

app.all("*",(req, res) => {
    const route = req.params
    res.status(404).json({"error": -2, "description": `route ${route[0]} is invalid`})
})
io.on('connection', socket)

server.listen(PORT, ()=> console.log(`listening on port ${PORT}`))
