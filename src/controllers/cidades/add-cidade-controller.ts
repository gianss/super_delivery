import { CidadeService } from '../../db/cidade-service'
import { CidadeModel } from '../../models/cidade'
import { ControllerResponse } from '../../models/controller'
const service = new CidadeService()

export class AddCidadeController {
    async setCidade (request: any): Promise<ControllerResponse> {
        const requiredFields = ['nome']
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
         const cidade: CidadeModel = {
            nome: request.nome,
            logo: request.logo,
            status: request.status
         }
         const cidadeAdd = await service.setCidade(cidade)
         const cidadeResponse = await service.getCidadeId(cidadeAdd[0])
         return {
            statusCode: 200,
            resposta: {
                mensagem: 'cidade adicionada com sucesso',
                cidade: cidadeResponse
            }
         }
    }
}
