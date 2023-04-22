import { Router } from 'express'
import { infoContollerGet } from './infoContoller.js'

const routerRandom = Router()

routerRandom.get('/', infoContollerGet)

export default routerRandom