import { connectDb } from '@config/database'
import sequelize from '@config/database'
import createAdmin from 'src/config/createAdmin'
import { join } from 'node:path'
import { readdirSync } from 'node:fs'
import createModules from './createModules'

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

      // Migración manual para la relación User-Roles
      await sequelize.query(`
        DO $$ 
        BEGIN
          -- Verificar si la columna roleId existe
          IF NOT EXISTS (
            SELECT 1 
            FROM information_schema.columns 
            WHERE table_name = 'users' 
            AND column_name = 'roleId'
          ) THEN
            -- Agregar la columna roleId si no existe
            ALTER TABLE "users" 
            ADD COLUMN "roleId" UUID;
          END IF;

          -- Verificar si la restricción de clave foránea existe
          IF NOT EXISTS (
            SELECT 1 
            FROM information_schema.table_constraints 
            WHERE constraint_name = 'users_roleId_fkey'
          ) THEN
            -- Agregar la restricción de clave foránea
            ALTER TABLE "users" 
            ADD CONSTRAINT "users_roleId_fkey" 
            FOREIGN KEY ("roleId") 
            REFERENCES "roles" ("id") 
            ON DELETE SET NULL 
            ON UPDATE CASCADE;
          END IF;
        END $$;
      `)

      await createAdmin()
      await createModules()
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
