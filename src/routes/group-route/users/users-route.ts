
import { Router } from 'express'
import { UserMiddleware } from '../../../middlewares/user'
import { authorize, upload } from '../../../utils/'

const uploads = upload('users/')
const Route = Router()
const makeUser = new UserMiddleware()

Route.get('/', authorize, makeUser.getUser)
Route.get('/get-user-token', authorize, makeUser.getUserToken)
Route.get('/get-user-ativos', authorize, makeUser.getUsersAtivos)
Route.get('/get-user/:id', authorize, makeUser.getUserId)
Route.post('/add', authorize, makeUser.setUser)
Route.post('/upload-pic', authorize, uploads.single('avatar'), makeUser.uploadPic)
Route.post('/login', makeUser.login)
Route.put('/update', authorize, makeUser.updateUser)
Route.delete('/delete/:id', authorize, makeUser.deleteUser)

export default Route
