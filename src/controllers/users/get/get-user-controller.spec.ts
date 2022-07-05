import { GetUserController } from './get-user-controller'

const makeSut = (): any => {
   const sut = new GetUserController()
   return {
      sut
   }
}

describe('get users', () => {
   test('verificar se retorno do getusers é um array', async () => {
      const { sut } = makeSut()
      const body = {
         tipo: 1,
         limit: 10,
         offset: 0
      }
      const httpResponse = await sut.getUser(body)
      expect(httpResponse.statusCode).toBe(200)
      expect(Array.isArray(httpResponse.resposta.users)).toBe(true)
   })

   test('verificar se retorno do getUsersAtivos é um array', async () => {
      const { sut } = makeSut()
      const body = {
         tipo: 1
      }
      const httpResponse = await sut.getUsersAtivos(body)
      expect(httpResponse.statusCode).toBe(200)
      expect(Array.isArray(httpResponse.resposta.users)).toBe(true)
   })

   test('retorno do getID é invalido - status 400', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.getUserID(0)
      expect(httpResponse.statusCode).toBe(400)
   })

   test('retorno do getID é invalido - status 400', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.getUserID({})
      expect(httpResponse.statusCode).toBe(400)
   })

   test('retorno do getUserToken é invalido - status 400', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.getUserToken('fdsfsdf')
      expect(httpResponse.statusCode).toBe(400)
   })
})
