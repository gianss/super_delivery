import { EmpresaMiddleware } from './../../../middlewares/empresa'
import { Router } from 'express'
import { authorize, upload } from '../../../utils'

const uploads = upload('empresas/')
const Route = Router()
const makeEmpresa = new EmpresaMiddleware()

Route.get('/', authorize, makeEmpresa.getEmpresa)
Route.get('/get-empresas-ativas', makeEmpresa.getEmpresasAtivos)
Route.get('/get-empresa/:id', makeEmpresa.getEmpresaId)
Route.post('/add', authorize, makeEmpresa.setEmpresa)
Route.post('/upload-pic', uploads.single('avatar'), makeEmpresa.uploadPic)
Route.put('/update', authorize, makeEmpresa.updateEmpresa)
Route.delete('/delete/:id', authorize, makeEmpresa.deleteEmpresa)

export default Route
