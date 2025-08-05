import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { GeneralExpenseAttributes } from '@type/finanzas/generalExpense'

// Importa los modelos para las relaciones
import Module from './modules'
import FinancialReport from './financialReport'

type GeneralExpenseCreationAttributes = Optional<GeneralExpenseAttributes, 'id'>

class GeneralExpense
  extends Model<GeneralExpenseAttributes, GeneralExpenseCreationAttributes>
  implements GeneralExpenseAttributes
{
  public id!: string
  public module_id!: string
  public expense_type!: string
  public amount!: number
  public date!: Date
  public description?: string | null
  public report_id?: string | null

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

GeneralExpense.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    module_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    expense_type: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    report_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'general_expenses',
    timestamps: true,
  },
)

// --- RELACIONES ---
GeneralExpense.belongsTo(Module, {
  foreignKey: 'report_id',
})

Module.hasMany(GeneralExpense, {
  foreignKey: 'module_id',
})

// Relación con FinancialReport
GeneralExpense.belongsTo(FinancialReport, {
  foreignKey: 'report_id',
})

FinancialReport.hasMany(GeneralExpense, {
  foreignKey: 'report_id',
})

export default GeneralExpense
