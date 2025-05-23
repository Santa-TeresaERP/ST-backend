import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { FinancialReportAttributes } from '@type/finanzas/financial_report'
import { v4 as uuid } from 'uuid'

class FinancialReport
  extends Model<
    FinancialReportAttributes,
    Optional<FinancialReportAttributes, 'report_id'>
  >
  implements FinancialReportAttributes
{
  public report_id!: string
  public start_date!: Date
  public end_date!: Date
  public total_income!: number
  public total_expenses!: number
  public net_profit!: number
  public observations!: Date
}

FinancialReport.init(
  {
    report_id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    start_date: { type: DataTypes.DATE, allowNull: false },
    end_date: { type: DataTypes.DATE, allowNull: false },
    total_income: { type: DataTypes.DECIMAL, allowNull: false },
    total_expenses: { type: DataTypes.DECIMAL, allowNull: false },
    net_profit: { type: DataTypes.DECIMAL, allowNull: false },
    observations: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'financial_report',
    timestamps: false,
  },
)

export default FinancialReport
