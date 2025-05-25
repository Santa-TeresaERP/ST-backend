import express from 'express'
import cors from 'cors'
import routesLoader from '@config/routeLoader'
import errorHandler from '@middlewares/errorMiddleware'
import { PORT } from '@environments'
import path from 'path'
import fs from 'fs'

// Función para crear carpetas de uploads si no existen
const createUploadsFolder = () => {
  const uploadsDir = path.join(__dirname, '../public/uploads')
  const productsDir = path.join(uploadsDir, 'products')

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true })
    console.log('Carpeta uploads creada')
  }

  if (!fs.existsSync(productsDir)) {
    fs.mkdirSync(productsDir, { recursive: true })
    console.log('Subcarpeta products creada')
  }
}

// Crear las carpetas necesarias al iniciar
createUploadsFolder()

const app = express()

// Middlewares
app.use(errorHandler)
app.use(cors())
app.use(express.json())

// Cargar rutas
routesLoader(app)

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
