import { Knex } from 'knex'
import { UserModel } from '../models/user'
import { knexconection as knex } from './config'

export class UserService {
   getUser (request: any): Knex.QueryBuilder<UserModel> {
      const pesquisa: string = request.pesquisa
      return knex('users')
      .select('users.*')
      .andWhere(function (): void {
         if (pesquisa) {
           this.where('nome', 'like', `%${pesquisa}%`)
           .orWhere('email', 'like', `%${pesquisa}%`)
           .orWhere('username', 'like', `%${pesquisa}%`)
         }
      })
      .andWhere(function (): void {
         if (request.status) {
            this.where('status_user_id', request.status)
         }
      })
      .andWhere(function (): void {
         if (request.empresa_id) {
            this.where('empresa_id', request.empresa_id)
         }
      })
      .limit(request.limit).offset(request.offset)
      .orderBy('nome', 'asc')
   }

   getUsersTotal (request: any): Knex.QueryBuilder {
      const pesquisa: string = request.pesquisa
      return knex('users').count('id as total')
      .andWhere(function (): void {
         if (pesquisa) {
           this.where('nome', 'like', `%${pesquisa}%`)
           .orWhere('email', 'like', `%${pesquisa}%`)
           .orWhere('username', 'like', `%${pesquisa}%`)
         }
      })
      .andWhere(function (): void {
         if (request.status) {
            this.where('status_user_id', request.status)
         }
      })
      .andWhere(function (): void {
         if (request.empresa_id) {
            this.where('empresa_id', request.empresa_id)
         }
      })
      .first()
   }

   getUserAtivos (request: any): Knex.QueryBuilder<UserModel> {
      return knex('users')
      .select('users.*')
      .where('status_user_id', 1)
   }

   login (email: string): Knex.QueryBuilder<UserModel> {
      return knex('users')
      .select('users.*')
      .where('status_user_id', 1)
      .where('email', email).orWhere('username', email).first()
   }

   getUserID (id: number): Knex.QueryBuilder<UserModel> {
      return knex('users').andWhere('id', id).first()
   }

   setUser (obj: any): Knex.QueryBuilder {
      return knex('users').insert(obj)
   }

   updateUser (obj: any): Knex.QueryBuilder {
      return knex('users').update(obj).where('id', obj.id)
   }

   deleteUser (id: number): any {
      try {
         return knex.transaction(async function (trx) {
            await trx('users').where('id', id).del()
         })
      } catch {
         return new Error()
      }
   }
}
