
import { EmpresaModel } from './../../../models/empresa'
import validator from 'validator'
import { encrypto } from '../../../utils'
import { ControllerResponse } from '../../../models/controller'
import { EmpresaService } from '../../../db/empresa-service'

const service = new EmpresaService()

export class AddEmpresaController {
   async setEmpresa (request: any): Promise<ControllerResponse> {
      try {
         const requiredFields = ['nome', 'cod_categoria', 'cod_cidade', 'cod_estado', 'desconto']
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
         const empresaAdd: any = {
            nome: request.nome,
            email: request.email,
            endereco: request.endereco,
            desconto: request.desconto,
            numero: request.numero,
            bairro: request.bairro,
            cod_cidade: request.cod_cidade,
            cod_estado: request.cod_estado,
            telefone: request.telefone,
            cnpj: encrypto(request.cnpj),
            image: request.image,
            tipo: request.tipo,
            cod_categoria: request.cod_categoria,
            status_empresa: request.status_empresa
         }
         const empresa = await service.setEmpresa(empresaAdd)
         const empresaAccount: EmpresaModel = await service.getEmpresaID(empresa[0])
         return {
            statusCode: 200,
            resposta: {
               empresa: empresaAccount
            }
         }
      } catch (error) {
         console.log(error)
         return {
            statusCode: 500,
            resposta: {
               mensagem: 'Erro no servidor!'
            }
         }
      }
   }
}
