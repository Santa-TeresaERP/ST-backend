import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { ChurchAttributes } from '@type/iglesia/church'
import { v4 as uuid } from 'uuid'
import RentChurch from './rentChurch'
import IncomeChurch from './IncomeChurch'

class Church
  extends Model<
    ChurchAttributes,
    Optional<ChurchAttributes, 'id' | 'createdAt' | 'updatedAt'>
  >
  implements ChurchAttributes
{
  public id!: string
  public name!: string
  public location!: string
  public state!: boolean
  public status!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Church.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
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
    tableName: 'churches',
    timestamps: true,
  },
)

Church.hasMany(RentChurch, {
  foreignKey: 'idChurch'   
});
RentChurch.belongsTo(Church, { 
  foreignKey: 'idChurch' 
})

Church.hasMany(IncomeChurch, {
  foreignKey: 'idChurch' 
});
IncomeChurch.belongsTo(Church, {
  foreignKey: 'idChurch'
});

export default Church
