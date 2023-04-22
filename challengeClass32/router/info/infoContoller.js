import { arg, plataformVersion, nodeVersion, memoryUsage, exePath, pid, fileProyect, processors} from '../../config/environment.js'
import { logger } from '../../log/winston.js'

export const infoContollerGet = (req, res) => {
    logger.info(`Route: ${req.baseUrl}, Method: ${req.method}`)
    res.render('info', { info:[arg, plataformVersion, nodeVersion, memoryUsage, exePath, pid, fileProyect, processors.length] })
}