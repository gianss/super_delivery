import { ControllerResponse } from '../../models/controller'
import { Request } from 'express'
import * as dotenv from 'dotenv'
dotenv.config()

export class UploadUserPicController {
   async uploadPic (request: Request): Promise<ControllerResponse> {
      try {
         return {
            statusCode: 200,
            resposta: {
               picture: process.env.URL_IMAGE + 'users/' + request.file.filename
            }
         }
      } catch (error) {
         return {
            statusCode: 500,
            resposta: {
               mensagem: 'erro no servidor'
            }
         }
      }
   }
}
