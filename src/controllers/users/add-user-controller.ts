import { UserService } from '../../db/user-service'
import { UserModel } from '../../models/user'
import validator from 'validator'
import { gerarSenha } from '../../utils/'
import { ControllerResponse } from '../../models/controller'

const userService = new UserService()

export class AddUserController {
   async setUser (request: any): Promise<ControllerResponse> {
      try {
         const requiredFields = ['nome', 'email', 'username', 'password', 'telefone', 'tipo_user_id', 'status_user_id']
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
         const isvalid = validator.isEmail(request.email)
         if (!isvalid) {
            return {
               statusCode: 400,
               resposta: {
                  mensagem: 'Email invalido'
               }
            }
         }
         const password: string = await gerarSenha(request.password)
         const userAdd: UserModel = {
            nome: request.nome,
            email: request.email,
            username: request.username,
            password: password,
            telefone: request.telefone,
            tipo_user_id: request.tipo_user_id,
            status_user_id: request.status_user_id
         }
         const user = await userService.setUser(userAdd)
         const userAccount: UserModel = await userService.getUserID(user[0])
         return {
            statusCode: 200,
            resposta: {
               user: userAccount
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
         return {
            statusCode: 500,
            resposta: {
               mensagem: 'Erro no servidor!'
            }
         }
      }
   }
}
