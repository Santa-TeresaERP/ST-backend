import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { salesChannelAttributes } from '@type/museo/sales_channel'
import { v4 as uuid } from 'uuid'

class SalesChannel
  extends Model<salesChannelAttributes, Optional<salesChannelAttributes, 'id'>>
  implements salesChannelAttributes
{
  public id!: string
  public name!: string
}

SalesChannel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuid,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'sales_channels',
    timestamps: true,
  },
)

export default SalesChannel
