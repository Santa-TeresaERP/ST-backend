import { Express } from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'

const routesLoader = (app: Express) => {
  const dirsPath = join(process.cwd(), 'src', 'routes')
  readdirSync(dirsPath).forEach(async (file) => {
    const pathName = file.replace('.ts', '')
    const path = await import(join(dirsPath, file))
    app.use(`api/${pathName.toLowerCase()}`, path.default)
  })
}

export default routesLoader