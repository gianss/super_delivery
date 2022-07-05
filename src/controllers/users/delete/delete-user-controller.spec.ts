import { DeleteUserController } from './delete-user-controller'

const makeSut = (): any => {
   const sut = new DeleteUserController()
   return {
      sut
   }
}

describe('controle de usuarios', () => {
   test('verificar se retorno do deleteUser é valido - status 200', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.deleteUser(2)
      expect(httpResponse.statusCode).toBe(200)
   })

   test('retorno do deleteUser é invalido - status 400', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.deleteUser({})
      expect(httpResponse.statusCode).toBe(400)
   })
})
