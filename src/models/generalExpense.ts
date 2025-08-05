import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@config/database';
import { GeneralExpenseAttributes } from '@type/finanzas/generalExpense';

// Importa los modelos para las relaciones
import Module from './modules';

type GeneralExpenseCreationAttributes = Optional<GeneralExpenseAttributes, 'id'>;

class GeneralExpense
  extends Model<GeneralExpenseAttributes, GeneralExpenseCreationAttributes>
  implements GeneralExpenseAttributes
{
  public id!: string;
  public module_id!: string;
  public expense_type!: string;
  public amount!: number;
  public date!: Date;
  public description?: string | null;
  public report_id?: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
  }
);

// --- RELACIONES ---
GeneralExpense.belongsTo(Module, {
  foreignKey: 'report_id',
  as: 'report',
});

Module.belongsTo(GeneralExpense, {
  foreignKey: 'module_id',
  targetKey: 'module_id', // La PK en Module es 'module_id'
  as: 'module',
});

// Cuando exista el modelo ResourceUsage, la relación se añadiría aquí:
// GeneralExpense.hasMany(ResourceUsage, { foreignKey: 'expense_id', as: 'resourceUsages' });

export default GeneralExpense;