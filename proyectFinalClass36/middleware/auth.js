export const auth = (req, res, next) => {
    const token = (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') ? req.headers.authorization.split(' ')[1] : undefined

    if(!token) {
        res.json({error: 'No hay credenciales'})
    }

}