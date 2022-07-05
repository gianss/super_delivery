import { EmpresaModel } from '../models/empresa'
import { Knex } from 'knex'
import { knexconection as knex } from './config'

export class EmpresaService {
   getEmpresa (request: any): Knex.QueryBuilder<EmpresaModel> {
      const pesquisa: string = request.pesquisa
      return knex('empresa')
      .select('empresa.*')
      .andWhere(function (): void {
         if (pesquisa) {
           this.where('nome_empresa', 'like', `%${pesquisa}%`)
           .orWhere('email', 'like', `%${pesquisa}%`)
         }
      })
      .andWhere(function (): void {
         if (request.cod_cidade) {
            this.where('cod_cidade', request.cod_cidade)
         }
      })
      .andWhere(function (): void {
         if (request.status) {
            this.where('status_empresa', request.status)
         }
      })
      .limit(request.limit).offset(request.offset)
      .orderBy('nome_empresa', 'asc')
   }

   getEmpresasTotal (request: any): Knex.QueryBuilder {
      const pesquisa: string = request.pesquisa
      return knex('empresa').count('id_empresa as total')
      .andWhere(function (): void {
         if (pesquisa) {
           this.where('nome_empresa', 'like', `%${pesquisa}%`)
           .orWhere('email', 'like', `%${pesquisa}%`)
         }
      })
      .andWhere(function (): void {
         if (request.cod_cidade) {
            this.where('cod_cidade', request.cod_cidade)
         }
      })
      .andWhere(function (): void {
         if (request.status) {
            this.where('status_empresa', request.status)
         }
      })
      .first()
   }

   getEmpresasAtivas (request: any): Knex.QueryBuilder<EmpresaModel> {
      let random = 'nome_empresa asc'
      if (request.random) {
         random = 'Rand()'
      }
      return knex('empresa').where('status_empresa', 1)
      .select('empresa.*')
      .andWhere(function (): void {
         if (request.cod_cidade) {
            this.where('cod_cidade', request.cod_cidade)
         }
      }).orderByRaw(random).limit(request.limit).offset(request.offset)
   }

   getEmpresasAtivasTotal (request: any): Knex.QueryBuilder<EmpresaModel> {
      return knex('empresa').where('status_empresa', 1)
      .count('empresa.id_empresa as total')
      .andWhere(function (): void {
         if (request.cod_cidade) {
            this.where('cod_cidade', request.cod_cidade)
         }
      }).first()
   }

   getEmpresaID (id: number): Knex.QueryBuilder<EmpresaModel> {
      return knex('empresa').andWhere('id_empresa', id).first()
   }

   setEmpresa (obj: any): Knex.QueryBuilder {
      return knex('empresa').insert(obj)
   }

   updateEmpresa (obj: any): Knex.QueryBuilder {
      return knex('empresa').update(obj).where('id_empresa', obj.id_empresa)
   }

   deleteEmpresa (id: number): any {
      try {
         return knex.transaction(async function (trx) {
            await trx('empresa').where('id_empresa', id).del()
         })
      } catch {
         return new Error()
      }
   }
}
