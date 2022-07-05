import { DeleteEmpresaController } from './delete-empresa-controller'

const makeSut = (): any => {
   const sut = new DeleteEmpresaController()
   return {
      sut
   }
}

describe('controle de usuarios', () => {
   test('verificar se retorno do deleteEmpresa é valido - status 200', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.deleteEmpresa(2)
      expect(httpResponse.statusCode).toBe(200)
   })

   test('retorno do deleteEmpresa é invalido - status 400', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.deleteEmpresa({})
      expect(httpResponse.statusCode).toBe(400)
   })
})
