import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { entranceAttributes } from '@type/museo/entrance'
import { v4 as uuid } from 'uuid'

// Importa los modelos relacionados
import User from '@models/user'
import TypePerson from '@models/type_person'
import SalesChannel from '@models/sales_channel'
import PaymentMethod from '@models/payment_metod'

class Entrance
  extends Model<entranceAttributes, Optional<entranceAttributes, 'id'>>
  implements entranceAttributes
{
  public id!: string
  public user_id!: string
  public type_person_id!: string
  public sale_date!: string
  public sale_number!: string
  public sale_channel!: string
  public total_sale!: number
  public payment_method!: string
  public free!: boolean
}

Entrance.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    user_id: { type: DataTypes.UUID, allowNull: false },
    type_person_id: { type: DataTypes.UUID, allowNull: false },
    sale_date: { type: DataTypes.STRING, allowNull: false },
    sale_number: { type: DataTypes.STRING, allowNull: false },
    sale_channel: { type: DataTypes.UUID, allowNull: false },
    total_sale: { type: DataTypes.FLOAT, allowNull: false },
    payment_method: { type: DataTypes.UUID, allowNull: false },
    free: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  {
    sequelize,
    tableName: 'entrances',
    timestamps: true,
  },
)

// Relaciones
Entrance.belongsTo(User, { foreignKey: 'user_id', as: 'user' })
Entrance.belongsTo(TypePerson, { foreignKey: 'type_person_id', as: 'type_person' })
Entrance.belongsTo(SalesChannel, { foreignKey: 'sale_channel', as: 'sales_channel' })
Entrance.belongsTo(PaymentMethod, { foreignKey: 'payment_method', as: 'payment_method_obj' })

export default Entrance
