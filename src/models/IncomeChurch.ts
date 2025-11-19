// src/models/iglesia/IncomeChurch.model.ts

import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database' // Asumimos que @config/database existe
import { IncomeChurchAttributes } from '@type/church/income_church' // Ajustamos la ruta de importación de tipos

// Definimos los atributos de creación, donde 'id', 'status', y timestamps son opcionales
type IncomeChurchCreationAttributes = Optional<
  IncomeChurchAttributes,
  'id' | 'status' | 'createdAt' | 'updatedAt'
>

// 1. Clase sin el 'export' inicial
class IncomeChurch
  extends Model<IncomeChurchAttributes, IncomeChurchCreationAttributes>
  implements IncomeChurchAttributes
{
  // Mapeo de la tabla INCOME_CHURCH
  public id!: string
  public name!: string
  public type!: 'donativo' | 'limosna' | 'limosna yape' | 'otros' | string
  public price!: number
  public status!: boolean // Clave para Soft Delete
  public date!: string
  public idChurch!: string // FK

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

// 2. Inicialización directa con .init()
IncomeChurch.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    type: {
      // Se mantiene el tipo String de tu esquema
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE, // Corresponde al 'double' de la tabla
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // Importante para la regla de Soft Delete
    },
    date: {
      type: DataTypes.STRING, // Mapeo directo al 'string' de tu tabla
      allowNull: false,
    },
    idChurch: {
      type: DataTypes.UUID, // Asumimos UUID para la FK
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'INCOME_CHURCH', // Nombre exacto de tu tabla
    timestamps: true,
    underscored: true, // Consistente con tu modelo original
  },
)

// 3. Exportación por defecto
export default IncomeChurch
