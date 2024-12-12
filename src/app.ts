import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDb } from './config/database'
import routesLoader from './config/routeLoader'
import createAdmin from './config/createAdmin'
import errorHandler from './middlewares/errorMiddleware.js'
import './models/user'
import './models/product_groceries_model.js'
import './models/Ingress_model.js'
import './models/egress_model.js'
import './models/local_model.js'
import './models/reserve_model.js'
import './models/product_craft_model.js'

const app = express()
app.use(errorHandler)
app.use(cors())
app.use(express.json())
routesLoader(app)

const PORT = process.env.PORT! || 3000

connectDb().then(() => {
  createAdmin()
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
