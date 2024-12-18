import express from 'express'
import cors from 'cors'
import routesLoader from '@config/routeLoader'
import errorHandler from '@middlewares/errorMiddleware'
import { PORT } from '@environments'

const app = express()
app.use(errorHandler)
app.use(cors())
app.use(express.json())
routesLoader(app)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
