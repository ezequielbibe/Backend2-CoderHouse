import { createUser } from '../../dto/authController.js'
import { phoneValidate, handleSendMail } from '../../helpers/index.js'
import { generateToken } from '../../middleware/jwt/handleToken.js'
import { logger } from '../../log/winston.js'

export const loginControllerGet = (req, res) => {
    if(req.session.passport) {
        res.redirect('/api/products')
        return
    }
    
    res.render('login')
}

export const loginControllerPost = async (req, res)=> {
    const { name, email, admin } = req.user
    const token = generateToken({ name, email, admin })
    res.json({ token })
}

export const registerControllerGet = (req, res) => {
    const  { originalUrl, method } = req

    logger.info(`Route: ${originalUrl}, Method: ${method}`)
    if(req.session.passport) {
        res.redirect('/api/products')
        return
    }
    res.render('register')
}

export const registerControllerPost = async (req, res) => {
    try{
        const  { originalUrl, method } = req
        const { name, age, address, phone, avatar } = req.body
        const { email, password } = req.session.passport.user    

        if(!phoneValidate(phone)) {
            res.status(500).send('Error!.. Phone number is invalid.')
            return
        }

        const request = createUser({ email, password, name, age, address, phone, avatar, admin })
        handleSendMail(`information of new user: \nName: ${name} \nAge: ${age} \nEmail: ${email} \nAddress: ${address}\nPhone: ${phone} \nAvatar: ${avatar}`)
        logger.info(`Route: ${originalUrl}, Method: ${method}`)
        res.redirect('/api/products')
    }catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const logoutControllerGet = (req, res)=> {
    const  { originalUrl, method } = req
    const { email } = req.session.passport.user

    logger.info(`Route: ${originalUrl}, Method: ${method}`)
    res.render('logout', { userName: email })
    req.session.destroy()
}