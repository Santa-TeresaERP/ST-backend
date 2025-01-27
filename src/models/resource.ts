import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { resourceAttributes } from '@type/resource'
import { v4 as uuid } from 'uuid'

class resource
  extends Model<
    resourceAttributes,
    Optional<resourceAttributes, 'id' | 'createdAt' | 'updatedAt'>
  >
  implements resourceAttributes
{
  public id!: string
  public name!: string
  public quantity!: number
  public unitPrice!: number
  public totalCost!: number
  public supplier!: string
  public purchaseDate!: string
  public observation!: string
}

resource.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    unitPrice: { type: DataTypes.FLOAT, allowNull: false },
    totalCost: { type: DataTypes.FLOAT, allowNull: false },
    supplier: { type: DataTypes.STRING, allowNull: false },
    purchaseDate: { type: DataTypes.DATE, allowNull: false },
    observation: { type: DataTypes.STRING, allowNull: true },
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
    tableName: 'resources',
    timestamps: true,
    hooks: {
      // Hook antes de crear un recurso
      beforeCreate: (resource) => {
        resource.totalCost = resource.quantity * resource.unitPrice
      },
      // Hook antes de actualizar un recurso
      beforeUpdate: (resource) => {
        resource.totalCost = resource.quantity * resource.unitPrice
      },
    },
  },
)

export default resource
