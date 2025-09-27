import { Model, DataTypes, Optional } from 'sequelize'
import sequelize from '@config/database'
import { OverheadAttributes } from '@type/finanzas/overheads'
import { v4 as uuid } from 'uuid'

class Overhead
  extends Model<
    OverheadAttributes,
    Optional<OverheadAttributes, 'id' | 'createdAt' | 'updatedAt' | 'status'>
  >
  implements OverheadAttributes
{
  public id!: string
  public name!: string
  public date!: string
  public type!: string
  public amount!: number
  public description?: string
  public status!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Overhead.init(
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
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'overheads',
  },
)

// Importar MonasteryExpense después de la definición para evitar dependencias circulares
import MonasteryExpense from './monasteryexpense'

// Definir las asociaciones
Overhead.hasMany(MonasteryExpense, {
  foreignKey: 'overheadsId',
  as: 'monasteryExpenses',
})

MonasteryExpense.belongsTo(Overhead, {
  foreignKey: 'overheadsId',
  as: 'overhead',
})

export default Overhead
