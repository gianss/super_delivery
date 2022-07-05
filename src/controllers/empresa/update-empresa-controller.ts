import { EmpresaService } from '../../db/empresa-service'
import { encrypto } from '../../utils'
import validator from 'validator'
import { ControllerResponse } from '../../models/controller'

const service = new EmpresaService()

export class UpdateEmpresaController {
   async updateEmpresa (request: any): Promise<ControllerResponse> {
      try {
         const requiredFields = ['id_empresa']
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
         if (request.cnpj) {
            request.cnpj = encrypto(request.cnpj)
         }
         await service.updateEmpresa(request)
         const empresa = await service.getEmpresaID(request.id_empresa)
         return {
            statusCode: 200,
            resposta: {
               empresa,
               mensagem: 'Informações atualizadas com sucesso'
            }
         }
      } catch (error) {
         console.log(error)
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
