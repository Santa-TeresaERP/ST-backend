import express from 'express'
import cors from 'cors'
import routesLoader from '@config/routeLoader'
import errorHandler from '@middlewares/errorMiddleware'
import { PORT } from '@environments'
import './models/relationships'
import salesRouter from './routes/sales'
import saleItemsRouter from './routes/saleItems'
import returnsRouter from './routes/returns'


const app = express()
app.use(errorHandler)
app.use(cors())
app.use(express.json())
routesLoader(app)

app.use('/sales', salesRouter)
app.use('/sale-items', saleItemsRouter)
app.use('/returns', returnsRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
