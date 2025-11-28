import BuysProduct from '@models/buysProduct'
import Product from '@models/product'
import Category from '@models/categories'
import ProductPurchased from '@models/productPurchased'
import { Op } from 'sequelize'
import { buysProductValidation } from '../../schemas/almacen/BuysProductSchema'
import { buysProductAttributes } from '@type/almacen/buys_product'
import serviceCreatewarehouseMovementProduct from '../warehouse_movement_product/serviceCreatewarehouse_movement_product'
import serviceCreateNonProducibleProduct from './serviceCreateNonProducibleProduct'
import createProductExpense from '@services/GeneralExpense/CollectionFunc/Inventory/ProductExpense'
import Supplier from '@models/suplier'
import Warehouse from '@models/warehouse'
import { validateWarehouseStatus } from '../../schemas/almacen/warehouseSchema'
import { getValidDate } from '../../utils/dateUtils'

const DEFAULT_WAREHOUSE_NAME = 'Almacen monasterio'

const pickFirstNonEmptyString = (
  ...values: Array<string | undefined | null>
): string | null => {
  for (const value of values) {
    if (typeof value === 'string') {
      const trimmed = value.trim()
      if (trimmed.length > 0) {
        return trimmed
      }
    }
  }
  return null
}

const isUuid = (value: string): boolean => {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
  return uuidRegex.test(value)
}

const resolveCategoryId = async (
  categoryInput?: string | null,
): Promise<string | null> => {
  if (!categoryInput) return null
  const trimmed = categoryInput.trim()
  if (!trimmed) return null

  if (isUuid(trimmed)) {
    const categoryById = await Category.findByPk(trimmed)
    if (categoryById) {
      return categoryById.id
    }
  }

  const categoryByName = await Category.findOne({ where: { name: trimmed } })
  return categoryByName?.id ?? null
}

type NonProducibleResult =
  | { success: true; product: Product; message?: string }
  | {
      success: false
      error: string
      existingProduct?: string
      details?: string
      stack?: string
    }

interface InventoryProductResolutionInput {
  body: CreateBuysProductInput
  productPurchasedId: string
  unitPrice: number
  callId: string
  validatedPayload: buysProductAttributes
  supplierName?: string | null
}

interface InventoryProductResolutionResult {
  productId: string | null
  nonProducibleProduct: Product | null
  reason?: string
}

const resolveInventoryProduct = async ({
  body,
  productPurchasedId,
  unitPrice,
  callId,
  validatedPayload,
  supplierName,
}: InventoryProductResolutionInput): Promise<InventoryProductResolutionResult> => {
  const directProductId = pickFirstNonEmptyString(
    body.product_id,
    body.inventory_product_id,
  )
  if (directProductId) {
    return { productId: directProductId, nonProducibleProduct: null }
  }

  const productPurchasedRecord =
    await ProductPurchased.findByPk(productPurchasedId)
  if (!productPurchasedRecord) {
    console.warn(
      `⚠️ [${callId}] Producto comprado ${productPurchasedId} no encontrado`,
    )
  }

  const productName =
    pickFirstNonEmptyString(
      body.product_name,
      body.productName,
      body.name,
      productPurchasedRecord?.name,
    ) ?? null

  if (!productName) {
    return {
      productId: null,
      nonProducibleProduct: null,
      reason:
        'No se pudo determinar el nombre del producto para crear el inventario.',
    }
  }

  const baseDescription =
    pickFirstNonEmptyString(
      body.product_description,
      body.productDescription,
      productPurchasedRecord?.description,
    ) ?? `Creado automáticamente desde ProductPurchased ${productPurchasedId}`

  const supplierDisplayName = supplierName?.trim() ?? null
  const productDescription = supplierDisplayName
    ? `${baseDescription} | Proveedor: ${supplierDisplayName}`
    : baseDescription

  const rawCategoryInput = pickFirstNonEmptyString(
    body.product_category_id,
    body.productCategoryId,
    body.category_id,
    body.category,
  )

  const categoryId = await resolveCategoryId(rawCategoryInput)

  if (!categoryId) {
    return {
      productId: null,
      nonProducibleProduct: null,
      reason:
        'No se pudo determinar la categoría para crear el producto en inventario.',
    }
  }

  const normalizedProductName = productName.trim()

  let existingInventoryProduct = await Product.findOne({
    where: {
      name: { [Op.iLike]: normalizedProductName },
      ...(categoryId ? { category_id: categoryId } : {}),
    },
  })

  if (!existingInventoryProduct) {
    existingInventoryProduct = await Product.findOne({
      where: {
        name: { [Op.iLike]: normalizedProductName },
      },
      order: [['updatedAt', 'DESC']],
    })
  }

  if (existingInventoryProduct) {
    await existingInventoryProduct.update({
      price: body.product_price ?? unitPrice,
      description: productDescription,
      ...(categoryId ? { category_id: categoryId } : {}),
    })
    console.log(
      `ℹ️ [${callId}] Producto inventariable reutilizado: ${existingInventoryProduct.id}`,
    )
    return {
      productId: existingInventoryProduct.id,
      nonProducibleProduct: null,
    }
  }

  const creationResult = (await serviceCreateNonProducibleProduct({
    name: productName,
    category_id: categoryId,
    price: body.product_price ?? unitPrice,
    description: productDescription,
    buysProductData: validatedPayload,
  })) as NonProducibleResult

  if (creationResult.success && creationResult.product) {
    return {
      productId: creationResult.product.id,
      nonProducibleProduct: creationResult.product,
    }
  }

  if (!creationResult.success && creationResult.existingProduct) {
    console.log(
      `ℹ️ [${callId}] Producto inventariable ya existía: ${creationResult.existingProduct}`,
    )
    return {
      productId: creationResult.existingProduct,
      nonProducibleProduct: null,
    }
  }

  return {
    productId: null,
    nonProducibleProduct: null,
    reason:
      (!creationResult.success && creationResult.error) ||
      'No se pudo crear el producto no producible asociado a la compra.',
  }
}
/**
 * Interfaz extendida para crear compra de producto con opción de crear producto no producible
 */
interface CreateBuysProductInput extends buysProductAttributes {
  create_non_producible_product?: boolean
  product_name?: string
  product_description?: string
  product_category_id?: string
  product_price?: number
  product_id?: string
  inventory_product_id?: string
  name?: string
  category?: string
  category_id?: string
  productName?: string
  productDescription?: string
  productCategoryId?: string
}

const serviceCreateBuysProduct = async (body: CreateBuysProductInput) => {
  const callId = Date.now().toString(36) + Math.random().toString(36).slice(2)
  console.log(`🎯 [${callId}] INICIO serviceCreateBuysProduct`)
  const payload = { ...body }

  try {
    if (!payload.warehouse_id) {
      const defaultWarehouse = await Warehouse.findOne({
        where: { name: DEFAULT_WAREHOUSE_NAME },
      })

      if (!defaultWarehouse) {
        return {
          success: false,
          error: `No se encontró el almacén por defecto (${DEFAULT_WAREHOUSE_NAME}).`,
          message: undefined,
          action: undefined,
          product: undefined,
          movement: undefined,
        }
      }

      payload.warehouse_id = defaultWarehouse.id
      console.log(
        `ℹ️ [${callId}] Almacén por defecto aplicado: ${DEFAULT_WAREHOUSE_NAME} (${defaultWarehouse.id})`,
      )
    }

    const validation = buysProductValidation(payload as buysProductAttributes)
    if (!validation.success) {
      return {
        success: false,
        error: 'Error de validación',
        details: validation.error.errors,
        body,
      }
    }

    const {
      warehouse_id,
      product_purchased_id,
      unit_price,
      total_cost,
      supplier_id,
      quantity,
      entry_date,
    } = validation.data

    console.log(`🔍 [${callId}] Datos validados`, {
      warehouse_id,
      product_purchased_id,
      supplier_id,
      quantity,
      unit_price,
      total_cost,
    })

    const [supplier, warehouse] = await Promise.all([
      Supplier.findByPk(supplier_id),
      Warehouse.findByPk(warehouse_id),
    ])

    const supplierName = supplier?.suplier_name ?? null

    const inventoryProductResolution = await resolveInventoryProduct({
      body: payload as CreateBuysProductInput,
      productPurchasedId: product_purchased_id,
      unitPrice: unit_price,
      callId,
      validatedPayload: validation.data,
      supplierName,
    })

    if (!inventoryProductResolution.productId) {
      return {
        success: false,
        error:
          inventoryProductResolution.reason ||
          'No se pudo asociar la compra a un producto de inventario (products)',
      }
    }

    const inventoryProductId = inventoryProductResolution.productId
    const nonProducibleProduct = inventoryProductResolution.nonProducibleProduct
    const expenseProductName =
      pickFirstNonEmptyString(
        payload.product_name,
        payload.productName,
        payload.name,
        nonProducibleProduct?.name,
      ) || 'Producto sin nombre'

    if (!warehouse) {
      return {
        success: false,
        error: 'Almacén no encontrado',
        message: undefined,
        action: undefined,
        product: undefined,
        movement: undefined,
      }
    }

    const warehouseStatusValidation = validateWarehouseStatus({
      status: warehouse.status,
    })
    if (!warehouseStatusValidation.success) {
      return {
        success: false,
        error: warehouseStatusValidation.error,
        message: undefined,
        action: undefined,
        product: undefined,
        movement: undefined,
      }
    }

    const supplierDisplayName = supplierName ?? 'Proveedor no especificado'
    // 3) Crear nuevo registro (siempre crea un nuevo dato, no acumula)
    const newWarehouseProduct = await BuysProduct.create({
      warehouse_id,
      product_purchased_id,
      unit_price,
      total_cost: Math.round(unit_price * quantity * 100) / 100,
      supplier_id,
      quantity,
      entry_date: getValidDate(entry_date),
    })

    // 3.5) Crear producto no producible si se solicita
    // 4) Movimiento de almacén (entrada)
    const movementResult = await serviceCreatewarehouseMovementProduct({
      warehouse_id,
      product_id: inventoryProductId,
      movement_type: 'entrada',
      quantity,
      movement_date: getValidDate(entry_date),
      observations: `Nueva compra registrada. Proveedor: ${supplierDisplayName}`,
    })
    if ('error' in movementResult) {
      console.warn(
        '⚠️ Error al crear movimiento de almacén:',
        movementResult.error,
      )
    }

    try {
      await createProductExpense({
        product_name: expenseProductName,
        quantity,
        unit_price,
        total_cost,
        warehouse_name: warehouse.name,
        supplier_name: supplierDisplayName,
        entry_date: getValidDate(entry_date),
      })
    } catch (error) {
      console.warn('⚠️ Error al registrar gasto de producto:', error)
    }

    console.log(`🏁 [${callId}] CREADO`)
    return {
      success: true,
      product: newWarehouseProduct,
      movement: movementResult,
      nonProducibleProduct: nonProducibleProduct,
      action: 'created',
      message: `Registro creado exitosamente${nonProducibleProduct ? ' con producto no producible' : ''}`,
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        error: 'Error al crear el Dato de compra',
        details: error.message,
        stack: error.stack,
        body,
      }
    }
    return {
      success: false,
      error: 'Error desconocido al crear el Dato de compra',
      body,
    }
  }
}

export default serviceCreateBuysProduct
