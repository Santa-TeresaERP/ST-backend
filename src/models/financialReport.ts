import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@config/database';
import { FinancialReportAttributes } from '@type/finanzas/financialReport';

// Importa los otros modelos para definir las relaciones
import GeneralIncome from '@models/generalIncome';
import GeneralExpense from '@models/generalExpense';

// Definición de los atributos de creación, donde 'id' es opcional
type FinancialReportCreationAttributes = Optional<FinancialReportAttributes, 'id'>;

class FinancialReport
  extends Model<FinancialReportAttributes, FinancialReportCreationAttributes>
  implements FinancialReportAttributes
{
  public id!: string;
  public start_date!: Date;
  public end_date!: Date;
  public total_income!: number;
  public total_expenses!: number;
  public net_profit!: number;
  public observations?: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

FinancialReport.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total_income: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    total_expenses: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    net_profit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    observations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'financial_reports',
    timestamps: true,
  }
);

// --- RELACIONES ---
FinancialReport.hasMany(GeneralIncome, {
  foreignKey: 'report_id',
  as: 'incomes',
});

FinancialReport.hasMany(GeneralExpense, {
  foreignKey: 'report_id',
  as: 'expenses',
});

// Cuando exista el modelo ResourceUsage, la relación se añadiría aquí:
// FinancialReport.hasMany(ResourceUsage, { foreignKey: 'report_id', as: 'resourceUsages' });

export default FinancialReport;