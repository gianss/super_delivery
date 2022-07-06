import knex from 'knex'
import * as dotenv from 'dotenv'
dotenv.config()

export const knexconection = knex({
    client: 'mysql',
    connection: {
        host: process.env.HOST_KEY,
        user: process.env.USER_KEY,
        password: process.env.PASSWORD_KEY,
        database: process.env.DATABASE_KEY
    }
})
