import { UpdateUserController } from './update-user-controller'

const makeSut = (): any => {
   const sut = new UpdateUserController()
   return {
      sut
   }
}

describe('controle de usuarios', () => {
   test('updateUser - Should return 400 if no id_user is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
         name: 'any_name'
      }
      const httpResponse = await sut.updateUser(httpRequest)
      expect(httpResponse.statusCode).toBe(400)
   })

   test('updateUser - Should return 400 if invalid params is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
         id_user: 1,
         invalid_params: 'any_email@email.com'
      }
      const httpResponse = await sut.updateUser(httpRequest)
      expect(httpResponse.statusCode).toBe(400)
   })
})
