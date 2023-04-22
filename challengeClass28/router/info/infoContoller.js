import { arg, plataformVersion, nodeVersion, memoryUsage, exePath, pid, fileProyect} from '../../config/environment.js'

export const infoContollerGet = (req, res) => {

    res.render('info', { info:[arg, plataformVersion, nodeVersion, memoryUsage, exePath, pid, fileProyect]})
}