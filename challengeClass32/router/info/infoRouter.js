import { Router } from 'express'
import { infoContollerGet } from './infoContoller.js'
import compression from 'compression'

const routerRandom = Router()

routerRandom.get('/',compression(), infoContollerGet)

export default routerRandom