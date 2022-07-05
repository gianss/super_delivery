import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
   return await knex.schema
      .createTable('cidades', function (table) {
         table.increments('id').primary()
         table.string('nome', 255).notNullable()
         table.string('logo', 255).nullable()
         table.integer('status', 1).defaultTo(1)
      })
      .createTable('categorias_empresa', function (table) {
         table.increments('id').primary()
         table.string('nome').notNullable()
         table.string('imagem', 255).nullable()
         table.integer('status', 1).defaultTo(1)
      })
      .createTable('empresas', function (table) {
         table.increments('id').primary()
         table.string('nome', 255).notNullable()
         table.string('doc', 255).notNullable()
         table.string('email', 255).notNullable()
         table.string('logo', 255).nullable()
         table.integer('open', 0).defaultTo(1)
         table.timestamp('created_at').defaultTo(knex.fn.now())
         table.integer('categoria_empresa_id', 11).nullable().unsigned().references('id').inTable('categorias_empresa')
         table.integer('cidade_id', 11).nullable().unsigned().references('id').inTable('cidades')
         table.integer('status', 1).defaultTo(1)
      })
      .createTable('tipo_user', function (table) {
         table.increments('id').primary()
         table.string('nome').notNullable()
      })
      .createTable('status_user', function (table) {
         table.increments('id').primary()
         table.string('nome').notNullable()
      })
      .createTable('users', function (table) {
         table.increments('id').primary()
         table.string('nome', 150).notNullable()
         table.string('email', 255).notNullable()
         table.string('username', 100).notNullable()
         table.string('password', 255).notNullable()
         table.string('telefone', 255).notNullable()
         table.timestamp('created_at').defaultTo(knex.fn.now())
         table.integer('empresa_id', 11).nullable().unsigned().references('id').inTable('empresas')
         table.integer('tipo_user_id', 11).notNullable().unsigned().references('id').inTable('tipo_user')
         table.integer('status_user_id', 11).notNullable().unsigned().references('id').inTable('status_user')
      })
      .createTable('categorias_produto', function (table) {
         table.increments('id').primary()
         table.string('nome')
         table.string('imagem', 255).nullable()
         table.integer('empresa_id', 11).nullable().unsigned().references('id').inTable('empresas')
         table.integer('status', 1).defaultTo(1)
      })
      .createTable('produtos', function (table) {
         table.increments('id').primary()
         table.string('nome').notNullable()
         table.string('descricao')
         table.decimal('valor', 12.2).notNullable()
         table.decimal('valor_promo', 12.2).notNullable()
         table.timestamp('created_at').defaultTo(knex.fn.now())
         table.integer('disponivel', 1).defaultTo(1)
         table.integer('categoria_empresa_id', 11).unsigned().references('id').inTable('categorias_produto')
         table.integer('status', 1).defaultTo(1)
      })
      .createTable('subprodutos', function (table) {
         table.increments('id').primary()
         table.string('nome').notNullable()
         table.string('descricao')
         table.integer('produto_id', 11).unsigned().references('id').inTable('produtos')
         table.integer('status', 1).defaultTo(1)
      })
      .createTable('subprodutos_itens', function (table) {
         table.increments('id').primary()
         table.string('nome').notNullable()
         table.string('descricao')
         table.integer('disponivel', 1).defaultTo(1)
         table.decimal('valor', 12.2).notNullable()
         table.decimal('valor_promo', 12.2).notNullable()
         table.integer('subprodutos_id', 11).unsigned().references('id').inTable('subprodutos')
         table.integer('status', 1).defaultTo(1)
      })
}

export async function down (knex: Knex): Promise<void> {
   return await knex.schema
      .dropTable('subprodutos_itens')
      .dropTable('subprodutos')
      .dropTable('produtos')
      .dropTable('categorias_produto')
      .dropTable('users')
      .dropTable('empresas')
      .dropTable('tipo_user')
      .dropTable('categorias_empresa')
      .dropTable('cidades')
}
