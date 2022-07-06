import { UserService } from '../../db/user-service'
import { gerarSenha } from '../../utils/'
import validator from 'validator'
import { ControllerResponse } from '../../models/controller'
import { UserModel } from '../../models/user'
const userService = new UserService()

export class UpdateUserController {
   async updateUser (request: any): Promise<ControllerResponse> {
      try {
         const requiredFields = ['id']
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
         if (request.password) {
            request.password = await gerarSenha(request.password)
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
         const userAdd: UserModel = {
            id: request.id,
            nome: request.nome,
            email: request.email,
            username: request.username,
            telefone: request.telefone,
            tipo_user_id: request.tipo_user_id,
            status_user_id: request.status_user_id
         }
         if (request.password) {
            userAdd.password = gerarSenha(request.password)
         }
         await userService.updateUser(userAdd)
         const userResponse = await userService.getUserID(request.id)
         return {
            statusCode: 200,
            resposta: {
               user: userResponse,
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
