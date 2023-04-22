import express from 'express'
import passport from 'passport'
import { loginControllerGet, loginControllerPost, logoutControllerGet, registerControllerGet, registerControllerPost } from './controllers/authController.js'

const routerAuth = express.Router()

routerAuth.get('/login', loginControllerGet)
routerAuth.post('/login', passport.authenticate('login', { failureRedirect: '/auth/error', failureMessage: true}), loginControllerPost)
routerAuth.get('/register', registerControllerGet)
routerAuth.post('/register', passport.authenticate('register', { failureRedirect: '/auth/error', failureMessage: true}), registerControllerPost)
routerAuth.get('/logout', logoutControllerGet)

routerAuth.get('/error', (req, res) => {
    const errorMessage = req.session.messages[0]
    req.session.destroy()
    res.send(`Error: ${errorMessage}`)
})


export default routerAuth