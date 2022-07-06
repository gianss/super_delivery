import express from 'express'
import * as fs from 'fs'
import * as https from 'https'
import cors from 'cors'
import routes from './routes'
import swaggerUi from 'swagger-ui-express'
import swaagerDocs from './swagger.json'
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.json({ limit: '50mb' }))
app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaagerDocs))
app.use(routes)
app.use('/uploads', express.static('uploads'))

let server: any

if (process.env.AMBIENTE === 'desenvolvimento') {
   server = app.listen(parseInt(process.env.PORT) || 5555, () => {
      console.log(`Server is listening ${process.env.PORT || 5555}`)
   })
} else {
   server = https.createServer({
      key: fs.readFileSync(process.env.LET_KEY),
      cert: fs.readFileSync(process.env.LET_CERT)
   }, app)

   server.listen(parseInt(process.env.PORT) || 5555, () => {
      console.log(`Server is listening ${process.env.PORT || 5555}`)
   })
}

export default server
