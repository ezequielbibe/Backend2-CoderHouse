import { fork } from 'child_process'
import { PORT, pid } from '../../config/environment.js'
import { logger } from '../../log/winston.js'
const forked = fork('./helpers/longprocess.js')

export const randomControllerGet = (req, res) => {
    logger.info(`Route: ${req.baseUrl}, Method: ${req.method}`)
/*     const { amount } = req.query
    amount ? forked.send(amount) : forked.send(1e8)
    forked.on('message',(response) => {
        res.end(`info pa: ${JSON.stringify(response, null, 2)}`)
    }) */
    res.send(`Servidor express Nginx en puerto ${PORT} - PID: ${pid}`)
}