import { connectDb } from '@config/database'
import createAdmin from '@createAdmin'
import { join } from 'node:path'
import { readdirSync } from 'node:fs'

class migrate {
  static modelLoader() {
    const modelPath = join(process.cwd(), 'src', 'models')
    const files = readdirSync(modelPath)
    files.forEach(async (file) => {
      const model = join(modelPath, file)
      await import(model)
    })
  }

  static async init() {
    try {
      await connectDb()
      await createAdmin()
      console.log('Migration succesfully')
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message)
      } else {
        console.log('Unknown error')
      }
    }
  }
}

migrate.modelLoader()
migrate.init()
