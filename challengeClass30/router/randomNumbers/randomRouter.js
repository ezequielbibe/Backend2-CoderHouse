import { Router } from 'express'
import { randomControllerGet } from './randomController.js'

const routerRandom = Router()

routerRandom.get('/?', randomControllerGet)

export default routerRandom