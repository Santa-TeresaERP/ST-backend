import { Sequelize } from 'sequelize'
import { PG_NAME, PG_HOST, PG_PASSWORD, PG_PORT, PG_USER } from '@environments'

const sequelize = new Sequelize(PG_NAME!, PG_USER!, PG_PASSWORD, {
  host: PG_HOST!,
  port: parseInt(PG_PORT!),
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 10000,
  },
})

export const connectDb = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    await sequelize.sync({ force: false })
    console.log('All models were synchronized successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export default sequelize
