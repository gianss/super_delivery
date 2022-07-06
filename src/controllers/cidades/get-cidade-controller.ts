import { CidadeService } from '../../db/cidade-service'
import { ControllerResponse } from '../../models/controller'
const service = new CidadeService()

export class GetCidadeController {
    async getCidades (request: any): Promise<ControllerResponse> {
        try {
            const cidades = await service.getCidades(request)
            const total = await service.getCidadeTotal(request)
            return {
                statusCode: 200,
                resposta: {
                    cidades,
                    total
                }
            }
        } catch (error) {
            return {
                statusCode: 500,
                resposta: {
                    mensagem: 'Erro no servidor'
                }
            }
        }
    }
}
