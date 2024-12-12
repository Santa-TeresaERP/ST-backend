import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDb } from './config/database.js'
import routesLoader from './config/routeLoader'
import createAdmin from './config/createAdmin.js'
import errorHandler from './middleware/errorMiddleware.js'
import './models/user_model.js'
import './models/product_groceries_model.js'
import './models/Ingress_model.js'
import './models/egress_model.js'
import './models/local_model.js'
import './models/reserve_model.js'
import './models/product_craft_model.js'


dotenv.config()

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
