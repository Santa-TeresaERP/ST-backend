import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { GeneralExpenseAttributes } from '@type/finanzas/general_expense'
import FinancialReport from '@models/financial_report'
import Module from '@models/modules'
import { v4 as uuid } from 'uuid'

class GeneralExpense
  extends Model<
    GeneralExpenseAttributes,
    Optional<GeneralExpenseAttributes, 'expense_id'>
  >
  implements GeneralExpenseAttributes
{
  public expense_id!: string
  public module_id!: string
  public expense_type!: string
  public amount!: number
  public date!: string
  public description!: string
  public report_id!: string
}

GeneralExpense.init(
  {
    expense_id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    module_id: { type: DataTypes.UUID, allowNull: false },
    expense_type: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.DECIMAL, allowNull: false },
    date: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    report_id: { type: DataTypes.UUID, allowNull: false },
  },
  {
    sequelize,
    tableName: 'general_expense',
    timestamps: false,
  },
)

// Relaciones
GeneralExpense.belongsTo(FinancialReport, { foreignKey: 'report_id' })
FinancialReport.hasMany(GeneralExpense, { foreignKey: 'report_id' })

GeneralExpense.belongsTo(Module, { foreignKey: 'module_id' })
Module.hasMany(GeneralExpense, { foreignKey: 'module_id' })

export default GeneralExpense
