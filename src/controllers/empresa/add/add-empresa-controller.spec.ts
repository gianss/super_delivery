import validator from 'validator'
import { AddEmpresaController } from './add-empresa-controller'

const makeSut = (): any => {
   const sut = new AddEmpresaController()
   return {
      sut
   }
}

describe('controle de empresa', () => {
   test('setEmpresa - Should return 400 if no name is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
         email: 'any_email@email.com',
         cod_estado: 1,
         cod_cidade: 1
      }
      const httpResponse = await sut.setEmpresa(httpRequest)
      expect(httpResponse.statusCode).toBe(400)
   })

   test('setEmpresa - Should return 400 if no email is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
         name: 'any_name',
         cod_estado: 1,
         cod_cidade: 1
      }
      const httpResponse = await sut.setEmpresa(httpRequest)
      expect(httpResponse.statusCode).toBe(400)
   })

   test('setEmpresa - Should return 400 if no cod_estado is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
         name: 'any_name',
         email: 'any_email@email.com',
         cod_cidade: 1
      }
      const httpResponse = await sut.setEmpresa(httpRequest)
      expect(httpResponse.statusCode).toBe(400)
   })

   test('setEmpresa - Should return 400 if no cod_cidade its not provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
         name: 'any_name',
         email: 'any_email@email.com',
         cod_estado: 1
      }
      const httpResponse = await sut.setEmpresa(httpRequest)
      expect(httpResponse.statusCode).toBe(400)
   })

   test('setEmpresa - Should return 400 if an invalid email is provided', async () => {
      const { sut } = makeSut()
      jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
      const httpRequest = {
         name: 'any_name',
         email: 'any_email@email.com',
         cod_estado: 1,
         cod_cidade: 1
      }
      const httpResponse = await sut.setEmpresa(httpRequest)
      expect(httpResponse.statusCode).toBe(400)
   })
})
