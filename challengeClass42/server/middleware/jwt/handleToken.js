import jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '../../config/environment.js'

export const generateToken = (user) => jwt.sign(JSON.stringify(user), PRIVATE_KEY)

export const verifyToken = (token) => jwt.verify(token, PRIVATE_KEY)

export const authMiddleware = (req, res, next) => {
    const token = (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') ? req.headers.authorization.split(' ')[1] : undefined

    if(!token) {
        res.status(401)
        res.json({error: 'No hay credenciales'})
    }

    try{ 
        const decodedData = verifyToken(token)
        req.user = decodedData;
        next()
    } catch(error) {
        res.status(401)
        res.json({ error: 'No hay credenciales'})
        return
    }
}