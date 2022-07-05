import { UserService } from '../../db/user-service'
import { UserModel } from '../../models/user'
import validator from 'validator'
import { gerarSenha, encrypto } from '../../utils/'
import { ControllerResponse } from '../../models/controller'

const userService = new UserService()

export class AddUserController {
   async setUser (request: any): Promise<ControllerResponse> {
      try {
         const requiredFields = ['nome', 'email', 'username', 'senha']
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
         const password: string = await gerarSenha(request.senha)
         const userAdd: any = {
            nome: request.nome,
            email: request.email,
            username: request.username,
            numero: request.numero,
            bairro: request.bairro,
            cod_cidade: request.cod_cidade,
            data_nascimento: request.data_nascimento,
            cod_estado: request.cod_estado,
            telefone: request.telefone,
            cpf: encrypto(request.cpf),
            cod_empresa: request.cod_empresa,
            senha: password,
            avatar: request.avatar,
            tipo: request.tipo,
            status_user: request.status_user
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
