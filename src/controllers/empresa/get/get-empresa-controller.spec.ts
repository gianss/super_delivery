import { GetEmpresaController } from './get-empresa-controller'

const makeSut = (): any => {
   const sut = new GetEmpresaController()
   return {
      sut
   }
}

describe('get empresas', () => {
   test('verificar se retorno do getEmpresas é um array', async () => {
      const { sut } = makeSut()
      const body = {
         tipo_empresa: 1,
         limit: 10,
         offset: 0
      }
      const httpResponse = await sut.getEmpresas(body)
      expect(httpResponse.statusCode).toBe(200)
      expect(Array.isArray(httpResponse.resposta.empresas)).toBe(true)
   })

   test('verificar se retorno do getEmpresasAtivas é um array', async () => {
      const { sut } = makeSut()
      const body = {
         tipo_empresa: 1
      }
      const httpResponse = await sut.getEmpresasAtivas(body)
      expect(httpResponse.statusCode).toBe(200)
      expect(Array.isArray(httpResponse.resposta.empresas)).toBe(true)
   })

   test('retorno do getEmpresaID é invalido - status 400', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.getEmpresaID(0)
      expect(httpResponse.statusCode).toBe(400)
   })

   test('retorno do getEmpresaID é invalido - status 400', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.getEmpresaID({})
      expect(httpResponse.statusCode).toBe(400)
   })
})
