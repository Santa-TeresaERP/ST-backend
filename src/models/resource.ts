import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { ResourceAttributes } from '@type/almacen/resource'
import { v4 as uuid } from 'uuid'
import Supplier from '@models/suplier'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ResourceCreationAttributes
  extends Optional<ResourceAttributes, 'id' | 'status'> {}
class Resource
  extends Model<ResourceAttributes, ResourceCreationAttributes>
  implements ResourceAttributes
{
  public id?: string
  public name!: string
  public observation?: string
  public status?: boolean // ← Nuevo campo para eliminación lógica
}

Resource.init(
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
    observation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // ← Activo por defecto
    },
  },
  {
    sequelize,
    tableName: 'resources',
    timestamps: true,
  },
)

Resource.belongsTo(Supplier, {
  foreignKey: 'supplier_id',
  as: 'supplier',
})

Supplier.hasMany(Resource, {
  foreignKey: 'supplier_id',
  as: 'resources',
})

export default Resource
