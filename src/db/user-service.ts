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
         }
      })
      .andWhere(function (): void {
         if (request.tipo) {
            this.where('tipo', request.tipo)
         }
      })
      .andWhere(function (): void {
         if (request.status) {
            this.where('status_user', request.status)
         }
      })
      .andWhere(function (): void {
         if (request.cod_estado) {
            this.where('cod_estado', request.cod_estado)
         }
      })
      .andWhere(function (): void {
         if (request.cod_cidade) {
            this.where('cod_cidade', request.cod_cidade)
         }
      })
      .andWhere(function (): void {
         if (request.cod_empresa) {
            this.where('cod_empresa', request.cod_empresa)
         }
      })
      .limit(request.limit).offset(request.offset)
      .orderBy('nome', 'asc')
   }

   getUsersTotal (request: any): Knex.QueryBuilder {
      const pesquisa: string = request.pesquisa
      return knex('users').count('id_user as total')
      .andWhere(function (): void {
         if (pesquisa) {
           this.where('nome', 'like', `%${pesquisa}%`)
           .orWhere('email', 'like', `%${pesquisa}%`)
         }
      })
      .andWhere(function (): void {
         if (request.tipo) {
            this.where('tipo', request.tipo)
         }
      })
      .andWhere(function (): void {
         if (request.status) {
            this.where('status_user', request.status)
         }
      })
      .andWhere(function (): void {
         if (request.cod_estado) {
            this.where('cod_estado', request.cod_estado)
         }
      })
      .andWhere(function (): void {
         if (request.cod_cidade) {
            this.where('cod_cidade', request.cod_cidade)
         }
      })
      .first()
   }

   getUserAtivos (request: any): Knex.QueryBuilder<UserModel> {
      return knex('users').where('status_user', 1)
      .select('users.*')
      .andWhere('tipo', request.tipo)
   }

   login (email: string, tipo): Knex.QueryBuilder<UserModel> {
      return knex('users')
      .select('users.*')
      .where('status_user', 1)
      .andWhere(function (): void {
         if (tipo) {
            this.where('tipo', tipo)
         }
      })
      .where('email', email).orWhere('username', email).first()
   }

   getUserID (id: number): Knex.QueryBuilder<UserModel> {
      return knex('users').andWhere('id_user', id).first()
   }

   setUser (obj: any): Knex.QueryBuilder {
      return knex('users').insert(obj)
   }

   updateUser (obj: any): Knex.QueryBuilder {
      return knex('users').update(obj).where('id_user', obj.id_user)
   }

   deleteUser (id: number): any {
      try {
         return knex.transaction(async function (trx) {
            await trx('users').where('id_user', id).del()
         })
      } catch {
         return new Error()
      }
   }
}
