import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/database'
import { MonasteryExpense as MonasteryExpenseAttributes } from '../types/finanzas/monasteryexpense'

class MonasteryExpense
  extends Model<
    MonasteryExpenseAttributes,
    Optional<MonasteryExpenseAttributes, 'id' | 'overheadsId'>
  >
  implements MonasteryExpenseAttributes
{
  public id!: string
  public category!: string
  public amount!: number
  public Name!: string
  public date!: Date
  public descripción!: string
  public overheadsId!: string
}

MonasteryExpense.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    descripción: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    overheadsId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'monastery_expenses',
    timestamps: true,
  },
)

// Definir las asociaciones después de la inicialización del modelo
// Para evitar problemas de dependencias circulares, las asociaciones
// se establecen mediante una función que se llama después de importar todos los modelos

export default MonasteryExpense
