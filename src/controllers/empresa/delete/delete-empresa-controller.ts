
import { ControllerResponse } from '../../../models/controller'
import { EmpresaService } from '../../../db/empresa-service'

const service = new EmpresaService()

export class DeleteEmpresaController {
   async deleteEmpresa (id: number): Promise<ControllerResponse> {
      try {
         if (isNaN(id)) {
            return {
               statusCode: 400,
               resposta: {
                  mensagem: 'informação invalida'
               }
            }
         }
         const item = await service.getEmpresaID(id)
         await service.deleteEmpresa(id)
         return {
            statusCode: 200,
            resposta: {
               mensagem: 'Empresa deletada com sucesso',
               item
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
}
