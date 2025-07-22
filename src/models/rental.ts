import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { RentalAttributes } from '@type/alquiler/rentals'
import { v4 as uuid } from 'uuid'
import Customer from '@models/customers'
import Place from '@models/places'
import User from '@models/user' // Asegúrate que exista este modelo

class Rental
  extends Model<RentalAttributes, Optional<RentalAttributes, 'id'>>
  implements RentalAttributes
{
  public id!: string
  public customer_id!: string
  public place_id!: string
  public user_id!: string
  public start_date!: Date
  public end_date!: Date

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Rental.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuid,
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    place_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'rentals',
    timestamps: true,
  },
)

// Relaciones
Rental.belongsTo(Customer, { foreignKey: 'customer_id' })
Rental.belongsTo(Place, { foreignKey: 'place_id' })
Rental.belongsTo(User, { foreignKey: 'user_id' }) // Relación con usuario

export default Rental
