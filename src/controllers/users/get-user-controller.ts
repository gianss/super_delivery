import { UserService } from '../../db/user-service'
import { UserModel } from '../../models/user'
import { ControllerResponse } from '../../models/controller'
import { decodeToken } from '../../utils/'

const userService = new UserService()

export class GetUserController {
   async getUser (request: any): Promise<ControllerResponse> {
      try {
         const users: UserModel[] = await userService.getUser(request)
         const usersTotal: any = await userService.getUsersTotal(request)
         return {
            statusCode: 200,
            resposta: {
               users: users,
               total: usersTotal.total
            }
         }
      } catch (error) {
         console.log(error)
         return {
            statusCode: 500,
            resposta: {
               mensagem: 'erro no servidor'
            }
         }
      }
   }

   async getUsersAtivos (request: any): Promise<ControllerResponse> {
      try {
         const users: UserModel[] = await userService.getUserAtivos(request)
         return {
            statusCode: 200,
            resposta: {
               users: users
            }
         }
      } catch (error) {
         console.log(error)
         return {
            statusCode: 500,
            resposta: {
               mensagem: 'erro no servidor'
            }
         }
      }
   }

   async getUserID (id: number): Promise<ControllerResponse> {
      try {
         if (typeof id !== 'number') {
            return {
               statusCode: 400,
               resposta: {
                  mensagem: 'informação invalida. O codigo deve ser do tipo number'
               }
            }
         }
         if (isNaN(id)) {
            return {
               statusCode: 400,
               resposta: {
                  mensagem: 'informação invalida'
               }
            }
         }
         const user: UserModel = await userService.getUserID(id)
         if (typeof user?.id === 'undefined') {
            return {
               statusCode: 400,
               resposta: {
                  mensagem: 'cod invalido'
               }
            }
         }
         return {
            statusCode: 200,
            resposta: {
               user: user
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

   async getUserToken (token: string): Promise<ControllerResponse> {
      try {
         const userToken = decodeToken(token)
         if (!userToken?.data) {
            return {
               statusCode: 400,
               resposta: {
                  mensagem: 'token invalido'
               }
            }
         }
         const user: UserModel = await userService.getUserID(userToken.data.id_users)
         if (typeof user?.id === 'undefined') {
            return {
               statusCode: 400,
               resposta: {
                  mensagem: 'cod invalido'
               }
            }
         }
         return {
            statusCode: 200,
            resposta: {
               user: user
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
