import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { plant_productionAttributes } from '@type/production/plant_production'
import { v4 as uuid } from 'uuid'

class PlantProduction
  extends Model<
    plant_productionAttributes,
    Optional<plant_productionAttributes, 'id'>
  >
  implements plant_productionAttributes
{
  public id!: string
  public plant_name!: string
  public address!: string
  public createdAt?: Date
  public updatedAt?: Date
}

PlantProduction.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    plant_name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW, // Fecha de creación por defecto
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW, // Fecha de actualización por defecto
    },
  },
  {
    sequelize,
    tableName: 'plant_production',
    timestamps: true, // Sequelize se encargará de createdAt y updatedAt automáticamente
  },
)

export default PlantProduction
