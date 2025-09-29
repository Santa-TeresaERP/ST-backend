import { Express, Router } from 'express'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'

interface RouteModule {
  default: Router
}

const routeLoader = async (app: Express) => {
  try {
    const routesDir = __dirname
    const files = readdirSync(routesDir).filter(
      (file) => file.endsWith('.ts') || file.endsWith('.js'),
    )

    for (const file of files) {
      const routeName = file.split('.').shift()
      const routePath = join(routesDir, file)

      if (routeName !== 'loader') {
        try {
          const module: RouteModule = await import(routePath)
          app.use(`/${routeName}`, module.default)
        } catch (err) {
          console.error(`❌ Error loading route ${file}:`, err)
        }
      }
    }
  } catch (err) {
    console.error(`❌ Error reading routes directory:`, err)
    throw err
  }
}

export default routeLoader
