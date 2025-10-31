import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { RentChurchAttributes } from '@type/alquiler/rentChurch'
import { v4 as uuid } from 'uuid'
import Place from '@models/places'

class RentChurch
  extends Model<RentChurchAttributes, Optional<RentChurchAttributes, 'id'>>
  implements RentChurchAttributes
{
  public id!: string
  public name!: string
  public type!: 'matrimonio' | 'bautizo' | 'otros'
  public startTime!: string
  public endTime!: string
  public price!: number
  public status!: boolean
  public date!: string
  public idChurch!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

RentChurch.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuid,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('matrimonio', 'bautizo', 'otros'),
      allowNull: false,
    },
    startTime: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    endTime: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    date: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    idChurch: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'rent_churches',
    timestamps: true,
  },
)

// Relaciones
RentChurch.belongsTo(Place, { foreignKey: 'idChurch' })

export default RentChurch
