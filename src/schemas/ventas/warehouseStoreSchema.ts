import { z } from 'zod'

// --- ESQUEMA PARA LA CREACIÓN ---
// Define la forma de los datos que se esperan al crear un nuevo registro de inventario.
// Es estricto y requiere los tres campos.
const createWarehouseStoreSchema = z.object({
  productId: z
    .string()
    .uuid({ message: 'El ID del producto debe ser un UUID válido.' }),
  storeId: z
    .string()
    .uuid({ message: 'El ID de la tienda debe ser un UUID válido.' }),
  quantity: z.number().int().min(0, 'La cantidad no puede ser negativa.'),
})

// --- ESQUEMA PARA LA ACTUALIZACIÓN ---
// Define la forma de los datos que se esperan al actualizar.
// Es más simple y solo requiere la cantidad.
const updateWarehouseStoreSchema = z.object({
  quantity: z
    .number({ invalid_type_error: 'La cantidad debe ser un número.' })
    .int('La cantidad debe ser un número entero')
    .min(0, 'La cantidad no puede ser negativa'),
})

// --- FUNCIONES DE VALIDACIÓN EXPORTADAS ---

/**
 * Función para validar los datos al CREAR un registro.
 * Usa el schema de creación.
 */
export const createWarehouseStoreValidation = (data: unknown) => {
  return createWarehouseStoreSchema.safeParse(data)
}
/**
 * Función para validar los datos al ACTUALIZAR un registro.
 * Usa el schema de actualización.
 */
export const updateWarehouseStoreValidation = (data: unknown) => {
  return updateWarehouseStoreSchema.safeParse(data)
}
