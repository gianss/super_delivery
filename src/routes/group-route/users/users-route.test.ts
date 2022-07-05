import request from 'supertest'
import server from '../../../index'
import faker from 'faker'

afterEach(() => {
   server.close()
})

describe('route users', () => {
   test('return 200 get-user-token', async () => {
		await request(server)
			.get('/v1/users/get-user-token')
         .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkX3VzZXIiOjQ0LCJuYW1lIjoiR2lhbiBTb3VzYSIsImVtYWlsIjoiZ2lhbnNzQGVtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFkxOXJqekpyVGhzOUIuLlBOcUgxWS5zMmMxM0QvdG5aOTBGaC9FOGd3NHA2UWQzdUtNQU5pIiwiY3BmIjoiMDU0OTg5NjY0NTA1IiwicGhvbmUiOiI3NzM0MzE0OTU1OCIsInR5cGUiOjEsInBlcm1pc3Npb24iOiJ7fSIsInN0YXR1c191c2VyIjoxfSwiaWF0IjoxNjM4ODYzOTU3fQ.NglBFjHRzlb3XKBsZSg0AOZIIWlteRm_pTrd05pJzz0')
			.expect(200)
	})
	test('return 200 getUsers', async () => {
		await request(server)
			.get('/v1/users/?limit=10&offset=0')
         .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkX3VzZXIiOjQ0LCJuYW1lIjoiR2lhbiBTb3VzYSIsImVtYWlsIjoiZ2lhbnNzQGVtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFkxOXJqekpyVGhzOUIuLlBOcUgxWS5zMmMxM0QvdG5aOTBGaC9FOGd3NHA2UWQzdUtNQU5pIiwiY3BmIjoiMDU0OTg5NjY0NTA1IiwicGhvbmUiOiI3NzM0MzE0OTU1OCIsInR5cGUiOjEsInBlcm1pc3Npb24iOiJ7fSIsInN0YXR1c191c2VyIjoxfSwiaWF0IjoxNjM4ODYzOTU3fQ.NglBFjHRzlb3XKBsZSg0AOZIIWlteRm_pTrd05pJzz0')
			.expect(200)
	})
   test('return 200 getUsersAtivos', async () => {
		await request(server)
			.get('/v1/users/get-user-ativos')
         .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkX3VzZXIiOjQ0LCJuYW1lIjoiR2lhbiBTb3VzYSIsImVtYWlsIjoiZ2lhbnNzQGVtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFkxOXJqekpyVGhzOUIuLlBOcUgxWS5zMmMxM0QvdG5aOTBGaC9FOGd3NHA2UWQzdUtNQU5pIiwiY3BmIjoiMDU0OTg5NjY0NTA1IiwicGhvbmUiOiI3NzM0MzE0OTU1OCIsInR5cGUiOjEsInBlcm1pc3Npb24iOiJ7fSIsInN0YXR1c191c2VyIjoxfSwiaWF0IjoxNjM4ODYzOTU3fQ.NglBFjHRzlb3XKBsZSg0AOZIIWlteRm_pTrd05pJzz0')
			.expect(200)
	})
   test('return 200 getUsersId', async () => {
		await request(server)
			.get('/v1/users/get-user/1')
         .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkX3VzZXIiOjQ0LCJuYW1lIjoiR2lhbiBTb3VzYSIsImVtYWlsIjoiZ2lhbnNzQGVtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFkxOXJqekpyVGhzOUIuLlBOcUgxWS5zMmMxM0QvdG5aOTBGaC9FOGd3NHA2UWQzdUtNQU5pIiwiY3BmIjoiMDU0OTg5NjY0NTA1IiwicGhvbmUiOiI3NzM0MzE0OTU1OCIsInR5cGUiOjEsInBlcm1pc3Npb24iOiJ7fSIsInN0YXR1c191c2VyIjoxfSwiaWF0IjoxNjM4ODYzOTU3fQ.NglBFjHRzlb3XKBsZSg0AOZIIWlteRm_pTrd05pJzz0')
			.expect(200)
	})
   test('return 200 login', async () => {
		await request(server)
			.post('/v1/users/login')
         .send({
            email: 'gianss@email.com',
            password: 'teste123'
         })
        .expect(200)
	})
   test('return 200 add', async () => {
		await request(server)
			.post('/v1/users/add')
         .send({
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: 'teste123',
            passwordConfirmation: 'teste123',
            cpf: '05455164505',
            phone: faker.phone.phoneNumber(),
            type: 1,
            permission: '{}',
            group_id: 1
         })
         .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkX3VzZXIiOjQ0LCJuYW1lIjoiR2lhbiBTb3VzYSIsImVtYWlsIjoiZ2lhbnNzQGVtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFkxOXJqekpyVGhzOUIuLlBOcUgxWS5zMmMxM0QvdG5aOTBGaC9FOGd3NHA2UWQzdUtNQU5pIiwiY3BmIjoiMDU0OTg5NjY0NTA1IiwicGhvbmUiOiI3NzM0MzE0OTU1OCIsInR5cGUiOjEsInBlcm1pc3Npb24iOiJ7fSIsInN0YXR1c191c2VyIjoxfSwiaWF0IjoxNjM4ODYzOTU3fQ.NglBFjHRzlb3XKBsZSg0AOZIIWlteRm_pTrd05pJzz0')
			.expect(200)
	})
   test('return 200 update', async () => {
		await request(server)
			.put('/v1/users/update')
         .send({
            id_user: 14,
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: 'teste123',
            passwordConfirmation: 'teste123',
            cpf: '05455164505',
            phone: faker.phone.phoneNumber(),
            type: 1,
            permission: '{}',
            group_id: 1
         })
         .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkX3VzZXIiOjQ0LCJuYW1lIjoiR2lhbiBTb3VzYSIsImVtYWlsIjoiZ2lhbnNzQGVtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFkxOXJqekpyVGhzOUIuLlBOcUgxWS5zMmMxM0QvdG5aOTBGaC9FOGd3NHA2UWQzdUtNQU5pIiwiY3BmIjoiMDU0OTg5NjY0NTA1IiwicGhvbmUiOiI3NzM0MzE0OTU1OCIsInR5cGUiOjEsInBlcm1pc3Npb24iOiJ7fSIsInN0YXR1c191c2VyIjoxfSwiaWF0IjoxNjM4ODYzOTU3fQ.NglBFjHRzlb3XKBsZSg0AOZIIWlteRm_pTrd05pJzz0')
			.expect(200)
	})
   test('return 200 delete', async () => {
		await request(server)
			.delete('/v1/users/delete/100')
         .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkX3VzZXIiOjQ0LCJuYW1lIjoiR2lhbiBTb3VzYSIsImVtYWlsIjoiZ2lhbnNzQGVtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFkxOXJqekpyVGhzOUIuLlBOcUgxWS5zMmMxM0QvdG5aOTBGaC9FOGd3NHA2UWQzdUtNQU5pIiwiY3BmIjoiMDU0OTg5NjY0NTA1IiwicGhvbmUiOiI3NzM0MzE0OTU1OCIsInR5cGUiOjEsInBlcm1pc3Npb24iOiJ7fSIsInN0YXR1c191c2VyIjoxfSwiaWF0IjoxNjM4ODYzOTU3fQ.NglBFjHRzlb3XKBsZSg0AOZIIWlteRm_pTrd05pJzz0')
			.expect(200)
	})
})
