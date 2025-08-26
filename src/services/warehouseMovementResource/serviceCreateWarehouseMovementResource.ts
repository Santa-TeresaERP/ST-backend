import WarehouseMovementResource from '@models/warehouseMovomentResource'
import { WarehouseMovomentResourceAttributes } from '@type/almacen/warehouse_movoment_resource'
import { warehouseMovementResourceValidation } from '../../schemas/almacen/warehouseMovomentResourceSchema'
import BuysResource from '@models/buysResource'
import { Transaction } from 'sequelize'
const serviceCreateWarehouseMovementResource = async (
  body: WarehouseMovomentResourceAttributes,
  transaction?: Transaction, // La transacción sigue siendo opcional para compatibilidad
) => {
  console.log(
    '🔍 Iniciando serviceCreateWarehouseMovementResource con body:',
    body,
  )

  const validation = warehouseMovementResourceValidation(body)
  if (!validation.success) {
    console.log('❌ Error de validación:', validation.error.errors)
    return { error: validation.error.errors }
  }
  console.log('✅ Validación exitosa')

  const {
    warehouse_id,
    resource_id,
    movement_type,
    quantity,
    movement_date,
    observations,
  } = validation.data

  // --- INICIO DE LA SOLUCIÓN DE MÍNIMO IMPACTO ---

  // 1. VERIFICAR SI EL STOCK YA FUE GESTIONADO EXTERNAMENTE
  // Si la observación incluye estas palabras clave, asumimos que otro servicio ya actualizó el stock.
  const isStockExternallyManaged =
    observations?.includes('produccion') ||
    observations?.includes('retroactivo') ||
    observations?.includes('Nueva compra registrada')

  // 2. CORTOCIRCUITO PARA MOVIMIENTOS DE AUDITORÍA (CANTIDAD CERO)
  if (quantity === 0) {
    console.log(
      '📝 Detectado movimiento de auditoría (cantidad 0). Registrando evento...',
    )
    const newRecord = await WarehouseMovementResource.create(
      { ...body },
      { transaction },
    )
    return { success: true, newRecord }
  }

  // --- FIN DE LA SOLUCIÓN ---

  try {
    // 3. LA LÓGICA DE ACTUALIZACIÓN DE STOCK SOLO SE EJECUTA SI NO FUE GESTIONADA EXTERNAMENTE
    if (!isStockExternallyManaged) {
      console.log(
        '🔄 Gestionando stock físico dentro de serviceCreateWarehouseMovementResource...',
      )

      // Aquí va tu lógica original para encontrar y actualizar BuysResource
      const warehouseResource = await BuysResource.findOne({
        where: { warehouse_id, resource_id },
        transaction,
      })

      if (!warehouseResource) {
        return { error: `El recurso ${resource_id} no existe en el almacén.` }
      }

      if (movement_type === 'salida') {
        if (warehouseResource.quantity < quantity) {
          return { error: 'Stock insuficiente.' }
        }
        warehouseResource.quantity -= quantity
      } else {
        // entrada
        warehouseResource.quantity += quantity
      }

      // En lugar de llamar a serviceUpdateWarehouseResource, guardamos directamente
      await warehouseResource.save({ transaction })
      console.log('✅ Stock actualizado correctamente')
    } else {
      console.log(
        '📝 Stock gestionado externamente por otro servicio. Este servicio solo registrará el movimiento.',
      )
    }

    // 4. REGISTRAR EL MOVIMIENTO (ESTO SIEMPRE SE HACE)
    const newRecord = await WarehouseMovementResource.create(
      {
        warehouse_id,
        resource_id,
        movement_type,
        quantity,
        movement_date,
        observations: observations ?? null,
      },
      { transaction },
    )

    // Has usado diferentes formatos de retorno, estandarizamos a uno que indique éxito.
    return { success: true, newRecord }
  } catch (error) {
    console.error('❌ Error en serviceCreateWarehouseMovementResource:', error)
    return {
      error: 'Error al procesar el movimiento de recursos',
      details: error instanceof Error ? error.message : 'Error desconocido',
    }
  }
}

export default serviceCreateWarehouseMovementResource
