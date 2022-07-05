
import { Response, Request } from 'express'
import multer from 'multer'
import { AddUserController, GetUserController, UpdateUserController, DeleteUserController, LoginUserController, UploadUserPicController } from '../controllers/users'

const makeAddUserController = new AddUserController()
const makeGetUserController = new GetUserController()
const makeGetUpdateController = new UpdateUserController()
const makeDeleteUpdateController = new DeleteUserController()
const makeLoginUpdateController = new LoginUserController()
const uploadUserPicController = new UploadUserPicController()

export class UserMiddleware {
   async uploadPic (req: Request, res: Response, err: any): Promise<void> {
      if (err instanceof multer.MulterError) {
         res.status(400).json({
            mensagem: 'Ocorreu um erro ao fazer upload da imagem!'
         })
      } else {
         const response = await uploadUserPicController.uploadPic(req)
         res.status(response.statusCode).json(response.resposta)
      }
   }

   async login (req: Request, res: Response): Promise<void> {
      const dados: any = await makeLoginUpdateController.login(req.body)
      res.status(dados.statusCode).json(dados.resposta)
   }

   async getUser (req: Request, res: Response): Promise<void> {
      const request: any = req.query
      request.token = req.headers['x-access-token']
      const dados: any = await makeGetUserController.getUser(request)
      res.status(dados.statusCode).json(dados.resposta)
   }

   async getUsersAtivos (req: Request, res: Response): Promise<void> {
      const request: any = req.query
      request.tipo = req.params.id
      const dados: any = await makeGetUserController.getUsersAtivos(request)
      res.status(dados.statusCode).json(dados.resposta)
   }

   async setUser (req: Request, res: Response): Promise<void> {
      const dados: any = await makeAddUserController.setUser(req.body)
      res.status(dados.statusCode).json(dados.resposta)
   }

   async deleteUser (req: Request, res: Response): Promise<void> {
      const dados: any = await makeDeleteUpdateController.deleteUser(parseInt(req.params.id))
      res.status(dados.statusCode).json(dados.resposta)
   }

   async updateUser (req: Request, res: Response): Promise<void> {
      const dados: any = await makeGetUpdateController.updateUser(req.body)
      res.status(dados.statusCode).json(dados.resposta)
   }

   async getUserId (req: Request, res: Response): Promise<void> {
      const dados = await makeGetUserController.getUserID(parseInt(req.params.id))
      res.status(dados.statusCode).json(dados.resposta)
   }

   async getUserToken (req: Request, res: Response): Promise<void> {
      const token: any = req.headers['x-access-token']
      const dados = await makeGetUserController.getUserToken(token)
      res.status(dados.statusCode).json(dados.resposta)
   }
}
