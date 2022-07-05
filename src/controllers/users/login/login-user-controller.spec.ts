import { LoginUserController } from './login-user-controller'

const makeSut = (): any => {
   const sut = new LoginUserController()
   return {
      sut
   }
}

describe('controle de usuarios', () => {
   test('login - Should return 400 if no email is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
         senha: 'any_password'
      }
      const httpResponse = await sut.login(httpRequest)
      expect(httpResponse.statusCode).toBe(400)
   })

   test('login - Should return 400 if no password is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
         email: 'any_email@email.com'
      }
      const httpResponse = await sut.login(httpRequest)
      expect(httpResponse.statusCode).toBe(400)
   })

   test('login - Should return 400 if no users are found', async () => {
      const { sut } = makeSut()
      const httpRequest = {
         email: 'any_email@email.com',
         senha: 'teste'
      }
      const httpResponse = await sut.login(httpRequest)
      expect(httpResponse.statusCode).toBe(400)
   })
})
