import { Knex } from 'knex'
import { CidadeModel } from '../models/cidade'
import { knexconection as knex } from './config'

export class CidadeService {
    setCidade (cidade: CidadeModel): Knex.QueryBuilder {
        return knex.from('cidades').insert(cidade)
    }

    getCidadeId (id: number): Knex.QueryBuilder {
        return knex.from('cidades').where('id', id).first()
    }

    getCidades (request: any): Knex.QueryBuilder {
        return knex.from('cidades').andWhere(function (): void {
            if (request.pesquisa) {
                this.where('nome', 'like', `%${request.pesquisa}%`)
            }
        }).limit(request.limit).offset(request.offset)
    }

    getCidadeTotal (request: any): Knex.QueryBuilder {
        return knex.from('cidades')
        .count('id as total')
        .andWhere(function (): void {
            if (request.pesquisa) {
                this.where('nome', 'like', `%${request.pesquisa}%`)
            }
        }).first()
    }
}
