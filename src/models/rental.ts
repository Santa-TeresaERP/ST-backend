import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { RentalAttributes } from '@type/alquiler/rentals'
import { v4 as uuid } from 'uuid'
import Customer from '@models/customers'
import Place from '@models/places'

class Rental
  extends Model<RentalAttributes, Optional<RentalAttributes, 'id'>>
  implements RentalAttributes
{
  public id!: string
  public customer_id!: string
  public place_id!: string
  public start_date!: Date
  public end_date!: Date
  public income_id?: string
  public expense_id?: string
  public status!: string

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
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    income_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    expense_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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

export default Rental
