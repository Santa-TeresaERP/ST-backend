import { Express } from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'

const routesLoader = (app: Express) => {
  const dirsPath = join(process.cwd(), 'src', 'routes')

  const loadRoutes = async () => {
    const files = readdirSync(dirsPath)

    for (const file of files) {
      if (file.endsWith('.ts')) {
        const route = await import(join(dirsPath, file))
        app.use('/', route.default)
      }
    }
  }

  loadRoutes().catch((err) => console.error(`Error to load routes ${err}`))
}

export default routesLoader
