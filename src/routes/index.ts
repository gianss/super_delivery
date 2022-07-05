import { Router } from 'express'
import fs from 'fs'
const routes = Router()

fs.readdirSync('./src/routes/group-route').forEach(async (fileWithoutDot) => {
   const active = await import(`./group-route/${fileWithoutDot}/${fileWithoutDot}-route`)
   routes.use(`/v1/${fileWithoutDot}`, active.default)
})

export default routes
