import { UserService } from '../../../db/user-service'
import { gerarSenha, encrypto } from '../../../utils/'
import validator from 'validator'
import { ControllerResponse } from '../../../models/controller'
const userService = new UserService()

export class UpdateUserController {
   async updateUser (request: any): Promise<ControllerResponse> {
      try {
         const requiredFields = ['id_user']
         for (const field of requiredFields) {
            if (!request[field]) {
               return {
                  statusCode: 400,
                  resposta: {
                     mensagem: `${field} não foi fornecido`
                  }
               }
            }
         }
         if (request.senha) {
            request.senha = await gerarSenha(request.senha)
         }
         if (request.email) {
            const isvalid = validator.isEmail(request.email)
            if (!isvalid) {
               return {
                  statusCode: 400,
                  resposta: {
                     mensagem: 'email invalido'
                  }
               }
            }
         }
         if (request.cpf) {
            request.cpf = encrypto(request.cpf)
         }
         await userService.updateUser(request)
         return {
            statusCode: 200,
            resposta: {
               user: request,
               mensagem: 'Informações atualizadas com sucesso'
            }
         }
      } catch (error) {
         console.log(error)
         if (error.errno === 1062) {
            if (error.sqlMessage?.includes('users.username')) {
               return {
                  statusCode: 400,
                  resposta: {
                     mensagem: 'Username já está em uso'
                  }
               }
             }
            return {
               statusCode: 400,
               resposta: {
                  mensagem: 'email já está em uso'
               }
            }
         }
         if (error.errno === 1054) {
            return {
               statusCode: 400,
               resposta: {
                  mensagem: 'Um ou mais parametros fornecidos é invalido'
               }
            }
         }
         return {
            statusCode: 500,
            resposta: {
               mensagem: 'erro no servidor'
            }
         }
      }
   }
}
