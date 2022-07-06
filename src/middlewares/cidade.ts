import { Response, Request } from 'express'
import { AddCidadeController, GetCidadeController } from '../controllers/cidades'

const makeAddCidadeController = new AddCidadeController()
const makeGetCidadeController = new GetCidadeController()

export class CidadeMiddleware {
    async getCidades (req: Request, res: Response): Promise<void> {
        const dados = await makeGetCidadeController.getCidades(req.query)
        res.status(dados.statusCode).send(dados.resposta)
    }

    async setCidades (req: Request, res: Response): Promise<void> {
        const dados = await makeAddCidadeController.setCidade(req.body)
        res.status(dados.statusCode).send(dados.resposta)
    }
}
