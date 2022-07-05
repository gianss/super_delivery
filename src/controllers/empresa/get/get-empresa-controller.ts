import { EmpresaModel } from './../../../models/empresa'
import { ControllerResponse } from '../../../models/controller'
import { EmpresaService } from '../../../db/empresa-service'

const service = new EmpresaService()

export class GetEmpresaController {
   async getEmpresas (request: any): Promise<ControllerResponse> {
      try {
         const empresas: EmpresaModel[] = await service.getEmpresa(request)
         const empresasTotal: any = await service.getEmpresasTotal(request)
         return {
            statusCode: 200,
            resposta: {
               empresas: empresas,
               total: empresasTotal.total
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

   async getEmpresasAtivas (request: any): Promise<ControllerResponse> {
      try {
         const empresas: EmpresaModel[] = await service.getEmpresasAtivas(request)
         const empresasTotal: any = await service.getEmpresasAtivasTotal(request)
         return {
            statusCode: 200,
            resposta: {
               empresas: empresas,
               total: empresasTotal.total
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

   async getEmpresaID (id: number): Promise<ControllerResponse> {
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
         const empresa: EmpresaModel = await service.getEmpresaID(id)
         if (typeof empresa?.id === 'undefined') {
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
               empresa: empresa
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
