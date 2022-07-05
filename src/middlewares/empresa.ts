import { GetEmpresaController, AddEmpresaController, UpdateEmpresaController, UploadEmpresaPicController, DeleteEmpresaController } from '../controllers/empresa'
import { Response, Request } from 'express'
import multer from 'multer'

const makeAddEmpresaController = new AddEmpresaController()
const makeGetEmpresaController = new GetEmpresaController()
const makeGetUpdateController = new UpdateEmpresaController()
const makeDeleteUpdateController = new DeleteEmpresaController()
const uploadEmpresaPicController = new UploadEmpresaPicController()

export class EmpresaMiddleware {
   async uploadPic (req: Request, res: Response, err: any): Promise<void> {
      if (err instanceof multer.MulterError) {
         res.status(400).json({
            mensagem: 'Ocorreu um erro ao fazer upload da imagem!'
         })
      } else {
         const response = await uploadEmpresaPicController.uploadPic(req)
         res.status(response.statusCode).json(response.resposta)
      }
   }

   async getEmpresa (req: Request, res: Response): Promise<void> {
      const request: any = req.query
      request.tipo = req.params.id
      request.token = req.headers['x-access-token']
      const dados: any = await makeGetEmpresaController.getEmpresas(request)
      res.status(dados.statusCode).json(dados.resposta)
   }

   async getEmpresasAtivos (req: Request, res: Response): Promise<void> {
      const request: any = req.query
      request.tipo = req.params.id
      const dados: any = await makeGetEmpresaController.getEmpresasAtivas(request)
      res.status(dados.statusCode).json(dados.resposta)
   }

   async setEmpresa (req: Request, res: Response): Promise<void> {
      const dados: any = await makeAddEmpresaController.setEmpresa(req.body)
      res.status(dados.statusCode).json(dados.resposta)
   }

   async deleteEmpresa (req: Request, res: Response): Promise<void> {
      const dados: any = await makeDeleteUpdateController.deleteEmpresa(parseInt(req.params.id))
      res.status(dados.statusCode).json(dados.resposta)
   }

   async updateEmpresa (req: Request, res: Response): Promise<void> {
      const dados: any = await makeGetUpdateController.updateEmpresa(req.body)
      res.status(dados.statusCode).json(dados.resposta)
   }

   async getEmpresaId (req: Request, res: Response): Promise<void> {
      const dados = await makeGetEmpresaController.getEmpresaID(parseInt(req.params.id))
      res.status(dados.statusCode).json(dados.resposta)
   }
}
