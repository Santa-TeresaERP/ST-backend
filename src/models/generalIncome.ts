import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@config/database';
import { GeneralIncomeAttributes } from '@type/finanzas/generalIncome';

// Importa los modelos para las relaciones
import FinancialReport from './financialReport';
import Module from './modules'; // Asumiendo que tu modelo de Módulo se llama así

type GeneralIncomeCreationAttributes = Optional<GeneralIncomeAttributes, 'id'>;

class GeneralIncome
  extends Model<GeneralIncomeAttributes, GeneralIncomeCreationAttributes>
  implements GeneralIncomeAttributes
{
  public id!: string;
  public module_id!: string;
  public income_type!: string;
  public amount!: number;
  public date!: Date;
  public description?: string | null;
  public report_id?: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

GeneralIncome.init(
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
    income_type: {
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
    tableName: 'general_incomes',
    timestamps: true,
  }
);

// --- RELACIONES ---
GeneralIncome.belongsTo(FinancialReport, {
  foreignKey: 'report_id',
  as: 'report',
});

GeneralIncome.belongsTo(Module, {
  foreignKey: 'module_id',
  targetKey: 'module_id', // ¡Importante! Porque la PK de Module es 'module_id'
  as: 'module',
});

export default GeneralIncome;