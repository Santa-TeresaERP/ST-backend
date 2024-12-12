import express from 'express'
import cors from 'cors'
import { connectDb } from '@config/database'
import routesLoader from '@config/routeLoader'
import createAdmin from '@createAdmin'
import errorHandler from '@middlewares/errorMiddleware.js'
import { PORT } from '@environments'
import '@models/user'
import '@models/product_groceries_model.js'
import '@models/Ingress_model.js'
import '@models/egress_model.js'
import '@models/local_model.js'
import '@models/reserve_model.js'
import '@models/product_craft_model.js'

const app = express()
app.use(errorHandler)
app.use(cors())
app.use(express.json())
routesLoader(app)

connectDb().then(() => {
  createAdmin()
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
