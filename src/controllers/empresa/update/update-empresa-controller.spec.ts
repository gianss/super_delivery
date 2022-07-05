import { UpdateEmpresaController } from './update-empresa-controller'

const makeSut = (): any => {
   const sut = new UpdateEmpresaController()
   return {
      sut
   }
}

describe('controle de usuarios', () => {
   test('updateEmpresa - Should return 400 if no id_empresa is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
         name: 'any_name'
      }
      const httpResponse = await sut.updateEmpresa(httpRequest)
      expect(httpResponse.statusCode).toBe(400)
   })

   test('updateEmpresa - Should return 400 if invalid params is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
         id_empresa: 1,
         invalid_params: 'any_email@email.com'
      }
      const httpResponse = await sut.updateEmpresa(httpRequest)
      expect(httpResponse.statusCode).toBe(400)
   })
})
