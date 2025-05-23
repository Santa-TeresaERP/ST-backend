import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { GeneralIncomeAttributes } from '@type/finanzas/general_income'
import FinancialReport from '@models/financial_report'
import Module from '@models/modules'
import { v4 as uuid } from 'uuid'

class GeneralIncome
  extends Model<
    GeneralIncomeAttributes,
    Optional<GeneralIncomeAttributes, 'income_id'>
  >
  implements GeneralIncomeAttributes
{
  public income_id!: string
  public module_id!: string
  public income_type!: string
  public amount!: number
  public date!: string
  public description!: string
  public report_id!: string
}

GeneralIncome.init(
  {
    income_id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    module_id: { type: DataTypes.UUID, allowNull: false },
    income_type: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.DECIMAL, allowNull: false },
    date: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    report_id: { type: DataTypes.UUID, allowNull: false },
  },
  {
    sequelize,
    tableName: 'general_income',
    timestamps: false,
  },
)

// Relaciones
GeneralIncome.belongsTo(FinancialReport, { foreignKey: 'report_id' })
FinancialReport.hasMany(GeneralIncome, { foreignKey: 'report_id' })

GeneralIncome.belongsTo(Module, { foreignKey: 'module_id' })
Module.hasMany(GeneralIncome, { foreignKey: 'module_id' })

export default GeneralIncome
