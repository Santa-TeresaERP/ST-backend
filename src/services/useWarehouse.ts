import Warehouse from '@models/warehouse'
import Product from '@models/product'
import { WarehouseAttributes } from '@type/warehouse'
import { warehouseValidation } from 'src/schemas/warehouseSchema'

class useWarehouse {
  static async createWarehouse(body: WarehouseAttributes) {
    const validation = warehouseValidation(body)
    if (!validation.success) {
      return { error: validation.error.errors }
    }

    const { product_id, quantity, inventory_adjustment_id, observations } =
      validation.data

    // esto verifica si el producto existe
    const productExists = await Product.findByPk(product_id)
    if (!productExists) {
      return { error: 'El producto no existe' }
    }

    const newWarehouse = await Warehouse.create({
      product_id,
      quantity,
      inventory_adjustment_id,
      observations,
    })

    return newWarehouse
  }

  // obtiene todos los registros de almacén con las relaciones
  static async getWarehouses() {
    try {
      const warehouses = await Warehouse.findAll({
        include: [{ model: Product, as: 'product' }],
      })
      return warehouses
    } catch {
      return { error: 'Error al obtener registros de almacén' }
    }
  }

  // Actualiza un registro de almacén
  static async updateWarehouse(id: string, body: WarehouseAttributes) {
    const validation = warehouseValidation(body)
    if (!validation.success) {
      return { error: validation.error.errors }
    }

    const warehouse = await Warehouse.findByPk(id)
    if (!warehouse) {
      return { error: 'El registro de almacén no existe' }
    }

    const { product_id, quantity, inventory_adjustment_id, observations } =
      validation.data

    // Verifica si el producto existe si se está actualizando product_id
    if (product_id) {
      const productExists = await Product.findByPk(product_id)
      if (!productExists) {
        return { error: 'El producto no existe' }
      }
    }

    await warehouse.update({
      product_id,
      quantity,
      inventory_adjustment_id,
      observations,
    })

    return warehouse
  }

  // elimina un registro de almacén
  static async deleteWarehouse(id: string) {
    const warehouse = await Warehouse.findByPk(id)
    if (!warehouse) {
      return { error: 'El registro de almacén no existe' }
    }

    await warehouse.destroy()
    return { message: 'Registro de almacén eliminado correctamente' }
  }
}

export default useWarehouse
