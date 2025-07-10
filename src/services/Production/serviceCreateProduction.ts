import Production from '@models/production'
import { productionAttributes } from '@type/production/production'
import { productionValidation } from 'src/schemas/production/productionSchema'
import Product from '@models/product'
import PlantProduction from '@models/plant_production'
import serviceCreatewarehouseMovementProduct from '../warehouse_movement_product/serviceCreatewarehouse_movement_product'
import { WarehouseMovomentProductAttributes } from '@type/almacen/warehouse_movement_product'

const serviceCreateProduction = async (body: productionAttributes) => {
  const validation = productionValidation(body)
  if (!validation.success) return { error: validation.error.errors }

  const {
    productId,
    quantityProduced,
    productionDate,
    observation,
    plant_id,
    warehouse_id,
  } = validation.data

  const product = await Product.findByPk(productId)
  if (!product) return { error: 'El producto no existe' }

  const plant = await PlantProduction.findByPk(plant_id)
  if (!plant) return { error: 'La planta no existe' }

  // TODO: Validate warehouse_id exists - For a future iteration if necessary

  const newProduction = await Production.create({
    productId,
    quantityProduced,
    productionDate,
    observation: observation ?? '',
    plant_id,
    // warehouse_id is not part of the Production model itself based on current structure
  })

  // Create warehouse movement product
  const movementData: WarehouseMovomentProductAttributes = {
    warehouse_id,
    product_id: newProduction.productId,
    movement_type: 'entrada',
    quantity: newProduction.quantityProduced,
    movement_date: new Date(newProduction.productionDate), // Ensure it's a Date object
    observations: `Entrada por producción ID: ${newProduction.id}${observation ? ' - ' + observation : ''}`,
    // store_id is optional and can be omitted or set to null
  }

  const movementResult =
    await serviceCreatewarehouseMovementProduct(movementData)

  if (!movementResult.success) {
    // Log the error or handle it as per application requirements
    // For now, we'll log it and still return the production data
    console.error(
      'Error creating warehouse movement product:',
      movementResult.error,
    )
    // Potentially, you might want to roll back the production creation here
    // or return a specific error indicating partial failure.
  }

  const datosFinales = {
    id: newProduction.id,
    producto: product.name,
    cantidad_producida: quantityProduced,
    fecha_produccion: productionDate,
    observacion: observation,
    planta: plant.plant_name,
    warehouse_id: warehouse_id, // Include warehouse_id in the response
    movement_id: movementResult.success ? movementResult.movement?.id : null,
  }

  console.log('📄 Datos de la producción creada:', datosFinales)
  return datosFinales
}

export default serviceCreateProduction
