import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
   return await knex.schema
      .createTable('endereco', function (table) {
         table.increments('id').primary()
         table.string('nome').notNullable()
         table.string('logradouro').notNullable()
         table.string('bairro').notNullable()
         table.string('numero').notNullable()
         table.string('complemento').nullable()
         table.string('referencia').nullable()
         table.integer('end_principal', 1).notNullable()
         table.integer('user_id', 11).nullable().unsigned().references('id').inTable('users')
      })
      .createTable('formas_pagamento', function (table) {
         table.increments('id').primary()
         table.string('nome').notNullable()
         table.integer('status').defaultTo(0)
      })
      .createTable('pagamento_empresa', function (table) {
         table.increments('id').primary()
         table.integer('empresa_id', 11).nullable().unsigned().references('id').inTable('empresas')
         table.integer('forma_pagamento_id', 11).nullable().unsigned().references('id').inTable('formas_pagamento')
      })
      .createTable('cupoms', function (table) {
         table.increments('id').primary()
         table.string('codigo').notNullable()
         table.decimal('valor', 12.2).notNullable()
         table.integer('tipo').defaultTo(0)
         table.integer('empresa_id', 11).nullable().unsigned().references('id').inTable('empresas')
         table.integer('status').defaultTo(0)
      })
      .createTable('status_pedido_list', function (table) {
         table.increments('id').primary()
         table.string('nome').notNullable()
      })
      .createTable('pedidos', function (table) {
         table.increments('id').primary()
         table.decimal('valor', 12.2).notNullable()
         table.decimal('desconto', 12.2).notNullable()
         table.timestamp('created_at').defaultTo(knex.fn.now())
         table.json('endereco').notNullable()
         table.json('cupom').nullable()
         table.integer('empresa_id', 11).nullable().unsigned().references('id').inTable('empresas')
         table.integer('forma_pagamento_id', 11).nullable().unsigned().references('id').inTable('formas_pagamento')
      })
      .createTable('pedidos_itens', function (table) {
         table.increments('id').primary()
         table.decimal('valor', 12.2).notNullable()
         table.integer('quantidade', 4).notNullable()
         table.json('produto')
         table.integer('pedido_id', 11).nullable().unsigned().references('id').inTable('pedidos')
      })
      .createTable('status_pedidos', function (table) {
         table.increments('id').primary()
         table.integer('status_pedido_list_id', 11).nullable().unsigned().references('id').inTable('status_pedido_list')
         table.integer('pedido_id', 11).nullable().unsigned().references('id').inTable('pedidos')
         table.timestamp('created_at').defaultTo(knex.fn.now())
      })
}

export async function down (knex: Knex): Promise<void> {
   return await knex.schema
      .dropTable('cupoms')
      .dropTable('pagamento_empresa')
      .dropTable('pedidos_itens')
      .dropTable('status_pedidos')
      .dropTable('status_pedido_list')
      .dropTable('pedidos')
      .dropTable('formas_pagamento')
      .dropTable('endereco')
}
