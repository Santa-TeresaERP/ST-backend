import { v4 as uuidv4 } from 'uuid'
import Return from '@models/returns'
import Product from '@models/product'
import Sale from '@models/sale'
import SaleDetail from '@models/saleDetail'
import { returnValidation } from '../../schemas/ventas/returnsSchema'
import { returnsAttributes } from '@type/ventas/returns'
import useWarehouseStore from '@services/warehouseStore'
import sequelize from '@config/database'

// ✅ Import agregado: registrar gasto por devolución
import createReturnExpense from '@services/GeneralExpense/CollectionFunc/sales/ReturnsExpense'
import WarehouseStore from '@models/warehouseStore'

const serviceCreateReturn = async (
  body: returnsAttributes,
): Promise<Return> => {
  console.log(
    '🔍 Iniciando creación de devolución/pérdida con datos:',
    JSON.stringify(body, null, 2),
  )

  const validation = returnValidation(body)

  if (!validation.success) {
    console.error('❌ Error de validación:', validation.error.format())
    throw new Error(
      'Validación fallida: ' +
        JSON.stringify(validation.error.format(), null, 2),
    )
  }

  const {
    id = uuidv4(),
    productId,
    salesId,
    storeId: bodyStoreId,
    reason,
    observations,
    quantity,
  } = validation.data
  console.log(
    `📦 Procesando ${
      salesId ? 'devolución' : 'pérdida directa'
    } para producto ${productId}`,
  )
  console.log(`🔢 Cantidad: ${quantity}, Razón: ${reason || 'No especificada'}`)

  if (!productId) {
    throw new Error('El ID del producto es obligatorio')
  }

  const product = await Product.findByPk(productId)
  if (!product) {
    throw new Error('Producto no encontrado')
  }

  const unitPrice = product.price
  const price = unitPrice * quantity

  // 📦 Buscar la venta para obtener el storeId
  let sale = null
  let storeId: string | null = bodyStoreId || null
  if (salesId) {
    console.log('🔍 Buscando venta con ID:', salesId)
    sale = await Sale.findByPk(salesId)
    if (!sale) {
      throw new Error('Venta no encontrada')
    }
    storeId = sale.store_id
    console.log('🏪 ID de tienda obtenido de la venta:', storeId)
  } else if (!storeId) {
    console.log(
      'ℹ️ No se proporcionó ID de venta ni de tienda, se registrará como pérdida directa',
    )
    // Obtener storeId del inventario
    // Primero obtenemos todas las tiendas que tienen este producto
    const allInventoryItems =
      await useWarehouseStore.serviceGetWarehouseStores()
    const inventoryItems = allInventoryItems.filter(
      (item: WarehouseStore) =>
        item.productId === productId && item.quantity > 0,
    )

    if (inventoryItems.length === 0) {
      throw new Error(
        'No se encontró el producto en el inventario de ninguna tienda',
      )
    }

    // Usamos la primera tienda que tenga el producto
    const inventoryItem = inventoryItems[0]
    storeId = inventoryItem.storeId
    console.log('🏪 ID de tienda obtenido del inventario:', storeId)
  }
  if (!storeId) {
    throw new Error('No se pudo determinar la tienda para el registro')
  }

  // storeId ya está definido arriba

  // 🔍 Si es una devolución, validar que no se devuelva más de lo que se vendió
  if (reason === 'devuelto') {
    const saleDetail = await SaleDetail.findOne({
      where: { saleId: salesId, productId },
    })

    if (!saleDetail) {
      console.error(
        `❌ No se encontró el producto ${productId} en la venta ${salesId}`,
      )
      throw new Error('Este producto no fue vendido en esta venta')
    }

    const existingReturns = await Return.findAll({
      where: { salesId, productId, reason: 'devuelto' },
    })

    const totalReturned = existingReturns.reduce(
      (sum, returnItem) => sum + returnItem.quantity,
      0,
    )

    const availableToReturn = saleDetail.quantity - totalReturned

    console.log(
      `📊 Validación de devolución - Producto: ${productId}, Venta: ${salesId}`,
    )
    console.log(`📦 Cantidad original vendida: ${saleDetail.quantity}`)
    console.log(`🔄 Cantidad ya devuelta: ${totalReturned}`)
    console.log(`✅ Cantidad disponible para devolver: ${availableToReturn}`)
    console.log(`🎯 Cantidad a devolver ahora: ${quantity}`)

    if (quantity > availableToReturn) {
      console.error(
        `❌ ERROR: Se intenta devolver ${quantity} unidades, pero solo se pueden devolver ${availableToReturn} unidades. (Vendido: ${saleDetail.quantity}, Ya devuelto: ${totalReturned})`,
      )
      throw new Error(
        `No se puede devolver ${quantity} unidades. Solo se pueden devolver ${availableToReturn} unidades de este producto en esta venta.`,
      )
    }

    console.log('✅ Validación de devolución exitosa')
  }

  // Iniciar transacción para asegurar consistencia
  const transaction = await sequelize.transaction()

  try {
    // 🔍 Buscar el inventario dentro de la transacción
    const warehouseStore =
      await useWarehouseStore.serviceGetWarehouseStoreByStoreAndProduct({
        storeId,
        productId,
      })

    // Verificar si el producto existe en el inventario
    if (!warehouseStore) {
      await transaction.rollback()
      throw new Error('Producto no encontrado en el inventario de esta tienda')
    }

    // Lógica condicional según la razón
    let updatedQuantity = warehouseStore.quantity
    const currentQty = Number(warehouseStore.quantity)
    const qtyToProcess = Number(quantity)

    if (reason === 'devuelto') {
      // Para devoluciones, sumamos al inventario
      updatedQuantity = currentQty + qtyToProcess
      console.log(
        `➕ Añadiendo ${qtyToProcess} unidades al inventario por devolución`,
      )
    } else if (reason === 'perdido' || reason === 'dañado' || !salesId) {
      // Para pérdidas, daños o sin venta asociada, restamos del inventario
      if (currentQty < qtyToProcess) {
        await transaction.rollback()
        throw new Error(
          `No hay suficiente inventario para registrar esta ${
            reason || 'pérdida'
          }. ` + `Disponible: ${currentQty}, Solicitado: ${qtyToProcess}`,
        )
      }
      updatedQuantity = currentQty - qtyToProcess
      console.log(
        `➖ Restando ${qtyToProcess} unidades del inventario por ${
          reason || 'pérdida sin venta asociada'
        }`,
      )
    }

    console.log(
      `🔄 Actualizando inventario - ID: ${warehouseStore.id}, Cantidad actual: ${warehouseStore.quantity}, Nueva cantidad: ${updatedQuantity}`,
    )

    // Actualizar el inventario
    const updateResult = await useWarehouseStore.serviceUpdateWarehouseStore(
      warehouseStore.id,
      { quantity: updatedQuantity },
    )

    if (!updateResult || (updateResult as { error?: string }).error) {
      await transaction.rollback()
      throw new Error(
        'Error al actualizar el inventario: ' +
          ((updateResult as { error?: string })?.error || 'Error desconocido'),
      )
    }

    // Actualizar observaciones de la venta si existe
    if (sale && reason === 'devuelto') {
      const returnInfo = `Devolución: ${quantity} unidad(es) de "${product.name}"`
      const currentObservations = sale.observations || ''
      const updatedObservations =
        currentObservations.trim() !== ''
          ? `${currentObservations}. ${returnInfo}`
          : returnInfo

      await sale.update({ observations: updatedObservations }, { transaction })
      console.log(
        `✅ Observaciones de la venta actualizadas: ${updatedObservations}`,
      )
    }

    // Crear la devolución
    const newReturn = await Return.create(
      {
        id,
        productId: productId ?? null,
        salesId: salesId ?? undefined,
        storeId: storeId,
        reason: reason ?? '',
        observations: observations ?? undefined,
        quantity,
        price,
      },
      { transaction },
    )

    console.log(
      ` Devolución creada exitosamente para ${quantity} unidad(es) de "${product.name}"`,
    )

    // Confirmar la transacción si todo salió bien
    await transaction.commit()

    // Registrar gasto por devolución DESPUÉS de commit para evitar lecturas sucias
    // Si falla, no afecta la creación de la devolución
    try {
      await createReturnExpense(newReturn.id)
    } catch (expenseErr) {
      console.error(
        ' No se pudo registrar el gasto por devolución tras el commit:',
        expenseErr,
      )
    }

    return newReturn
  } catch (error: unknown) {
    // Revertir la transacción en caso de error
    await transaction.rollback()
    console.error('Error en la transacción de devolución:', error)
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Error desconocido al registrar devolución',
    )
  }
}

export default serviceCreateReturn
