import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
   return await knex.schema
      .alterTable('subprodutos', function (table) {
         table.string('nome').nullable().alter()
      })
}

export async function down (knex: Knex): Promise<void> {
   return await knex.schema
   .alterTable('subprodutos', function (table) {
      table.string('nome').notNullable()
   })
}
