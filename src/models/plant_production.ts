import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { plant_productionAttributes } from '@type/production/plant_production'
import { v4 as uuid } from 'uuid'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface PlantProductionCreationAttributes
  extends Optional<plant_productionAttributes, 'id' | 'status'> {}

class PlantProduction
  extends Model<plant_productionAttributes, PlantProductionCreationAttributes>
  implements plant_productionAttributes
{
  public id!: string
  public plant_name!: string
  public address!: string
  public warehouse_id!: string
  public status?: boolean
  public createdAt?: Date
  public updatedAt?: Date
}

PlantProduction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuid,
      primaryKey: true,
    },
    plant_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    warehouse_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // ← Activo por defecto
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'plant_production',
    timestamps: true,
  },
)

export default PlantProduction
