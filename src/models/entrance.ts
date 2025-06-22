import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { entranceAttributes } from '@type/museo/entrance'
import { v4 as uuid } from 'uuid'

class Entrance
  extends Model<entranceAttributes, Optional<entranceAttributes, 'id'>>
  implements entranceAttributes
{
  public id!: string
  public user_id!: string
  public type_person_id!: string
  public reference_id!: string
  public sale_data!: string
  public sale_number!: string
  public sale_channel!: string
  public total_sale!: number
  public payment_method!: string
  public free!: boolean
}

Entrance.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuid,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    type_person_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    reference_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    sale_data: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sale_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sale_channel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_sale: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    free: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'entrances',
    timestamps: true,
  },
)

export default Entrance
