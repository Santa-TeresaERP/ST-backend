import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  type WhereOptions,
  type ModelStatic,
} from 'sequelize'
import { Op } from 'sequelize'
import sequelize from '../config/database'

export class MonasteryExpense extends Model<
  InferAttributes<MonasteryExpense>,
  InferCreationAttributes<MonasteryExpense>
> {
  declare id: string
  declare expense_date: Date
  declare description: string
  declare amount: number
  declare category: string
  declare payment_method: string
  declare receipt_number: string | null
  declare notes: string | null
  declare created_at: CreationOptional<Date>
  declare updated_at: CreationOptional<Date>

  // Timestamps
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  // Métodos estáticos
  static async findWithFilters(filters: {
    startDate?: Date
    endDate?: Date
    category?: string
    payment_method?: string
    minAmount?: number
    maxAmount?: number
  }): Promise<MonasteryExpense[]> {
    const where: WhereOptions<MonasteryExpense> = {}

    // Filtrar por rango de fechas
    if (filters.startDate || filters.endDate) {
      where.expense_date = {}
      if (filters.startDate) {
        Object.assign(where.expense_date, {
          [Op.gte]: new Date(filters.startDate),
        })
      }
      if (filters.endDate) {
        const endDate = new Date(filters.endDate)
        endDate.setHours(23, 59, 59, 999)
        Object.assign(where.expense_date, { [Op.lte]: endDate })
      }
    }

    // Filtrar por categoría
    if (filters.category) {
      where.category = filters.category
    }

    // Filtrar por método de pago
    if (filters.payment_method) {
      where.payment_method = filters.payment_method
    }

    // Filtrar por rango de monto
    if (filters.minAmount !== undefined || filters.maxAmount !== undefined) {
      where.amount = {}
      if (filters.minAmount !== undefined) {
        Object.assign(where.amount, { [Op.gte]: filters.minAmount })
      }
      if (filters.maxAmount !== undefined) {
        Object.assign(where.amount, { [Op.lte]: filters.maxAmount })
      }
    }

    return await this.findAll({ where })
  }

  // Calcular total de gastos por categoría en un rango de fechas
  static async getExpensesByCategory(startDate?: Date, endDate?: Date) {
    const where: WhereOptions<MonasteryExpense> = {}
    if (startDate || endDate) {
      where.expense_date = {}

      if (startDate) {
        Object.assign(where.expense_date, { [Op.gte]: new Date(startDate) })
      }
      if (endDate) {
        const end = new Date(endDate)
        end.setHours(23, 59, 59, 999)
        Object.assign(where.expense_date, { [Op.lte]: end })
      }
    }

    type ExpenseByCategory = {
      category: string
      total: string | number
    }

    const results = await (this as unknown as ModelStatic<Model>).findAll({
      attributes: [
        'category',
        [sequelize.fn('SUM', sequelize.col('amount')), 'total'],
      ],
      where,
      group: ['category'],
      order: [[sequelize.fn('SUM', sequelize.col('amount')), 'DESC']],
      raw: true,
    })

    return (results as unknown as ExpenseByCategory[]).map((r) => ({
      category: r.category,
      total: typeof r.total === 'string' ? parseFloat(r.total) || 0 : r.total || 0,
    }))
  }
}

// Definición del modelo
MonasteryExpense.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    expense_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'La fecha del gasto es requerida' },
        isDate: {
          msg: 'La fecha del gasto debe ser una fecha válida',
          args: true,
        },
      },
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: { msg: 'La descripción es requerida' },
        notEmpty: { msg: 'La descripción no puede estar vacía' },
        len: {
          args: [3, 255],
          msg: 'La descripción debe tener entre 3 y 255 caracteres',
        },
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: { msg: 'El monto es requerido' },
        isDecimal: { msg: 'El monto debe ser un número válido' },
        min: {
          args: [0.01],
          msg: 'El monto debe ser mayor a cero',
        },
      },
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: { msg: 'La categoría es requerida' },
        notEmpty: { msg: 'La categoría no puede estar vacía' },
        len: {
          args: [2, 100],
          msg: 'La categoría debe tener entre 2 y 100 caracteres',
        },
      },
    },
    payment_method: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: { msg: 'El método de pago es requerido' },
        notEmpty: { msg: 'El método de pago no puede estar vacío' },
        len: {
          args: [2, 50],
          msg: 'El método de pago debe tener entre 2 y 50 caracteres',
        },
      },
    },
    receipt_number: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: {
        len: {
          args: [0, 50],
          msg: 'El número de recibo no puede tener más de 50 caracteres',
        },
      },
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: {
          args: [0, 1000],
          msg: 'Las notas no pueden tener más de 1000 caracteres',
        },
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  },
  {
    sequelize,
    modelName: 'MonasteryExpense',
    tableName: 'monastery_expenses',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  } as const,
)

export default MonasteryExpense
