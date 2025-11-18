import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { RentChurchAttributes } from '@type/iglesia/rentChurch'
import { v4 as uuid } from 'uuid'
import Church from './church'

class RentChurch
  extends Model<
    RentChurchAttributes,
    Optional<
      RentChurchAttributes,
      'id' | 'createdAt' | 'updatedAt' | 'idChurch' | 'status'
    >
  >
  implements RentChurchAttributes
{
  public id!: string
  public name!: string
  public type!: 'matrimonio' | 'bautizo' | 'otros' | string
  public startTime!: string
  public endTime!: string
  public price!: number
  public status!: boolean
  public date!: string
  public idChurch!: string | null
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

RentChurch.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    startTime: { type: DataTypes.STRING, allowNull: false },
    endTime: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DOUBLE, allowNull: false, defaultValue: 0 },
    status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    idChurch: { type: DataTypes.UUID, allowNull: true, defaultValue: null },
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
    tableName: 'rent_church',
    timestamps: true,
  },
)

RentChurch.belongsTo(Church, { 
  foreignKey: 'idChurch' 
})  

export default RentChurch
