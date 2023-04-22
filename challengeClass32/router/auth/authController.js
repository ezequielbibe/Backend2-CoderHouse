import { logger } from '../../log/winston.js'

export const loginControllerGet = (req, res) => {
    logger.info(`Route: ${req.baseUrl}, Method: ${req.method}`)
    if(req.session.passport) {
        res.redirect('/')
        return
    }
    res.render('login')
}

export const loginControllerPost = (req, res)=> {
    logger.info(`Route: ${req.baseUrl}, Method: ${req.method}`)
    res.redirect('/')
}

export const registerControllerGet = (req, res) => {
    logger.info(`Route: ${req.baseUrl}, Method: ${req.method}`)
    if(req.session.passport) {
        res.redirect('/')
        return
    }
    res.render('register')
}

export const registerControllerPost = async (req, res) => {
    logger.info(`Route: ${req.baseUrl}, Method: ${req.method}`)
    res.redirect('/')
}

export const logoutControllerGet = (req, res)=> {
    logger.info(`Route: ${req.baseUrl}, Method: ${req.method}`)
    res.render('logout', {userName: req.session.passport.user.email})
    req.session.destroy()
}