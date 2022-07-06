import { Router } from 'express'
import { CidadeMiddleware } from '../../../middlewares/cidade'
import { authorize } from '../../../utils'
const middleware = new CidadeMiddleware()
const Route = Router()

Route.get('/', authorize, middleware.getCidades)
Route.post('/add', authorize, middleware.setCidades)

export default Route
