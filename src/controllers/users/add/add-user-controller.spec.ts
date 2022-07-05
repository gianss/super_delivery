import validator from 'validator'
import { AddUserController } from './add-user-controller'

const makeSut = (): any => {
   const sut = new AddUserController()
   return {
      sut
   }
}

describe('controle de usuarios', () => {
   test('setUser - Should return 400 if no nome is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
         email: 'any_email@email.com',
         senha: 'any_senha',
         username: 'any_username'
      }
      const httpResponse = await sut.setUser(httpRequest)
      expect(httpResponse.statusCode).toBe(400)
   })

   test('setUser - Should return 400 if no email is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
         nome: 'any_nome',
         senha: 'any_senha',
         username: 'any_username'
      }
      const httpResponse = await sut.setUser(httpRequest)
      expect(httpResponse.statusCode).toBe(400)
   })

   test('setUser - Should return 400 if no senha is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
         nome: 'any_nome',
         email: 'any_email@email.com',
         username: 'any_username'
      }
      const httpResponse = await sut.setUser(httpRequest)
      expect(httpResponse.statusCode).toBe(400)
   })

   test('setUser - Should return 400 if no username: its not provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
         nome: 'any_nome',
         email: 'any_email@email.com',
         senha: 'any_senha'
      }
      const httpResponse = await sut.setUser(httpRequest)
      expect(httpResponse.statusCode).toBe(400)
   })

   test('setUser - Should return 400 if an invalid email is provided', async () => {
      const { sut } = makeSut()
      jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
      const httpRequest = {
         nome: 'any_nome',
         email: 'any_email@email.com',
         senha: 'any_senha',
         username: 'any_username'
      }
      const httpResponse = await sut.setUser(httpRequest)
      expect(httpResponse.statusCode).toBe(400)
   })
})
