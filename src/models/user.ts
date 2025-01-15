import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { UserAttributes } from '@type/auth'
import { v4 as uuid } from 'uuid'

class User
  extends Model<
    UserAttributes,
    Optional<
      UserAttributes,
      'id' | 'createdAt' | 'updatedAt' | 'roleId' | 'status'
    >
  >
  implements UserAttributes
{
  public id!: string
  public name!: string
  public dni!: string
  public phonenumber!: string
  public email!: string
  public roleId!: string
  public password!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public status!: boolean
}

User.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    phonenumber: { type: DataTypes.STRING, allowNull: false },
    dni: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: { type: DataTypes.STRING, allowNull: false },
    roleId: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  },
)

export default User
