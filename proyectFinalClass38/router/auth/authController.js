import { usersMongo } from '../../daos/index.js'
import { phoneValidate } from '../../helpers/index.js'
import { handleSendMail } from '../../helpers/sendMail/handleSendMail.js'
import { logger } from '../../log/winston.js'

export const loginControllerGet = (req, res) => {
    logger.info(`Route: ${req.originalUrl}, Method: ${req.method}`)
    if(req.session.passport) {
        res.redirect('/api/products')
        return
    }
    res.render('login')
}

export const loginControllerPost = async (req, res)=> {
    logger.info(`Route: ${req.originalUrl}, Method: ${req.method}`)
    res.redirect('/api/products')
}

export const registerControllerGet = (req, res) => {
    logger.info(`Route: ${req.originalUrl}, Method: ${req.method}`)
    if(req.session.passport) {
        res.redirect('/api/products')
        return
    }
    res.render('register')
}

export const registerControllerPost = async (req, res) => {
    const { name, age, address, phone, avatar } = req.body
    const { email, password, admin} = req.session.passport.user
    try{
        if(!phoneValidate(phone)) {
            res.status(500).send('Error!.. Phone number is invalid.')
            return
        }
        await usersMongo.createData({ email, password, name, age, address, phone, avatar, admin })
        handleSendMail(`information of new user: \nName: ${name} \nAge: ${age} \nEmail: ${email} \nAddress: ${address}\nPhone: ${phone} \nAvatar: ${avatar}`)
        logger.info(`Route: ${req.originalUrl}, Method: ${req.method}`)
        res.redirect('/api/products')
    }catch(error){
        console.log({error})
    }
}

export const logoutControllerGet = (req, res)=> {
    logger.info(`Route: ${req.originalUrl}, Method: ${req.method}`)
    res.render('logout', {userName: req.session.passport.user.email})
    req.session.destroy()
}