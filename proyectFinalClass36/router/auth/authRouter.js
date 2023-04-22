import { Router } from 'express'
import passport from 'passport'
import { loginControllerGet, loginControllerPost, logoutControllerGet, registerControllerGet, registerControllerPost } from './authController.js'

const authRouter = Router()

authRouter.get('/login', loginControllerGet)
authRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/error', failureMessage: true}), loginControllerPost)
authRouter.get('/register', registerControllerGet)
authRouter.post('/register', passport.authenticate('register', { failureRedirect: '/auth/error', failureMessage: true}), registerControllerPost)
authRouter.get('/logout', logoutControllerGet)

authRouter.get('/error', (req, res) => {
    const errorMessage = req.session.messages[0]
    req.session.destroy()
    res.send(`Error: ${errorMessage}`)
})


export default authRouter