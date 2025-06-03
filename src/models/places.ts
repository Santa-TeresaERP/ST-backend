import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { PlaceAttributes } from '@type/alquiler/places'
import { v4 as uuid } from 'uuid'
import Location from '@models/locations'

class Place
  extends Model<PlaceAttributes, Optional<PlaceAttributes, 'id'>>
  implements PlaceAttributes
{
  public id!: string
  public location_id!: string
  public name!: string
  public area!: string
}

Place.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuid,
      primaryKey: true,
    },
    location_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    area: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'places',
    timestamps: true,
  },
)

// Relaciones
Place.belongsTo(Location, { foreignKey: 'location_id' })

export default Place
