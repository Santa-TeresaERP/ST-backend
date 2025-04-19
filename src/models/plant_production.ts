import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { plant_productionAttributes } from '@type/plant_production'
import { v4 as uuid } from 'uuid'

class PlantProduction
  extends Model<plant_productionAttributes, Optional<plant_productionAttributes, 'plant_id'>>
  implements plant_productionAttributes
{
  public plant_id!: string
  public plant_name!: string
  public adress!: Date
  public createdAt?: Date
  public updatedAt?: Date
}

PlantProduction.init(
  {
    plant_id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    plant_name: { type: DataTypes.STRING, allowNull: false },
    adress: { type: DataTypes.DATE, allowNull: false },  // Definimos el tipo DATE para la dirección
  },
  {
    sequelize,
    tableName: 'plant_production',
    timestamps: true,  // Sequelize se encargará de createdAt y updatedAt automáticamente
  },
)

export default PlantProduction
