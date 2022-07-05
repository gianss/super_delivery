require('dotenv/config')

const { CLIENT, DATABASE_KEY, USER_KEY, PASSWORD_KEY, HOST_KEY, PORT } = process.env
const diretorio = __dirname

module.exports = {
   development: {
       client: CLIENT,
       connection: {
           database: DATABASE_KEY,
           user: USER_KEY,
           password: PASSWORD_KEY,
           host: HOST_KEY,
           port: PORT
       },
       migrations: {
           directory: `${diretorio}/src/db/migrations`
       }
   },
   production: {
      client: CLIENT,
      connection: {
          database: DATABASE_KEY,
          user: USER_KEY,
          password: PASSWORD_KEY,
          host: HOST_KEY,
          port: PORT
      },
      migrations: {
          directory: `${diretorio}/src/db/migrations`
      }
  }
}
