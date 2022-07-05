import { UserModel } from './../../../models/user'
import { UserService } from '../../../db/user-service'
import { generateToken, comprarSenha } from '../../../utils/'
import { ControllerResponse } from '../../../models/controller'

const userService = new UserService()

export class LoginUserController {
   async login (request: any): Promise<ControllerResponse> {
      try {
         const requiredFields = ['email', 'senha']
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
         const user: UserModel = await userService.login(request.email, request.tipo)
         if (typeof user?.id === 'undefined') {
            return {
               statusCode: 400,
               resposta: {
                  mensagem: 'Email e/ou senha invalido(s)'
               }
            }
         }
         const senhaValid: boolean = await comprarSenha(request.password, user.password)
         if (senhaValid) {
            const token = generateToken(user)
            return {
               statusCode: 200,
               resposta: {
                  token: token,
                  user: user
               }
            }
         } else {
            return {
               statusCode: 400,
               resposta: {
                  mensagem: 'Email ou senha invalido #2'
               }
            }
         }
      } catch (error) {
         console.log(error)
         if (error.errno === 1062) {
            return {
               statusCode: 400,
               resposta: {
                  mensagem: 'email já está em uso'
               }
            }
         };
         return {
            statusCode: 500,
            resposta: {
               mensagem: 'Erro no servidor'
            }
         }
      }
   }
}
