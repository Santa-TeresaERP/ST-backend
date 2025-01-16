import { DataTypes, Model } from 'sequelize'
import sequelize from '@config/database'
import { resourceProductionAttributes } from '@type/production'
import resource from '@models/resource'
import production from '@models/production'

class resourceProduction
  extends Model<resourceProductionAttributes>
  implements resourceProductionAttributes
{
  public productionId!: string
  public resourceId!: string
}

resourceProduction.init(
  {
    productionId: { type: DataTypes.UUID, allowNull: false },
    resourceId: { type: DataTypes.UUID, allowNull: false },
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
    tableName: 'resourceProductions',
    timestamps: true,
  },
)

resourceProduction.belongsTo(production, {
  foreignKey: 'productionId',
  as: 'production',
})

production.hasMany(resourceProduction, {
  foreignKey: 'productionId',
  as: 'resourceProductions',
})

resourceProduction.belongsTo(resource, {
  foreignKey: 'resourceId',
  as: 'resource',
})

resource.hasMany(resourceProduction, {
  foreignKey: 'resourceId',
  as: 'productions',
})

export default resourceProduction
