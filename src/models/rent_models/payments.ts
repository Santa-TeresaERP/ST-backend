import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { RentalAttributes } from '@type/modules'
import { v4 as uuid } from 'uuid'
import Customer from '@models/rent_models/customers'
import Location from '@models/rent_models/locations'
import User from '@models/users_models/user'

class Rental
  extends Model<RentalAttributes, Optional<RentalAttributes, 'id'>>
  implements RentalAttributes
{
  public id!: string
  public customer_id!: string
  public location_id!: string
  public user_id!: string
  public event_description!: string
  public start_date!: Date
  public end_date!: Date
  public price!: string
  public status!: string
}

Rental.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    customer_id: { type: DataTypes.UUID, allowNull: false },
    location_id: { type: DataTypes.UUID, allowNull: false },
    user_id: { type: DataTypes.UUID, allowNull: false },
    event_description: { type: DataTypes.STRING, allowNull: false },
    start_date: { type: DataTypes.DATE, allowNull: false },
    end_date: { type: DataTypes.DATE, allowNull: false },
    price: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, tableName: 'rentals', timestamps: true },
)

// Define relationships
Rental.belongsTo(Customer, { foreignKey: 'customer_id' })
Rental.belongsTo(Location, { foreignKey: 'location_id' })
Rental.belongsTo(User, { foreignKey: 'user_id' })

export default Rental
