import Warehouse from '@models/warehouse'
import PlantProduction from '@models/plant_production'

export async function createDefaultWarehouseAndPlant() {
  // Crear almacén
  const warehouse = await Warehouse.create({
    name: 'Almacen monasterio',
    location: 'Calle melgar 303',
    capacity: 1000,
    observation: 'Almacén principal',
  })

  // Crear planta de producción relacionada
  await PlantProduction.create({
    plant_name: 'planta monasterio',
    address: 'Calle melgar 303',
    warehouse_id: warehouse.id,
  })
}