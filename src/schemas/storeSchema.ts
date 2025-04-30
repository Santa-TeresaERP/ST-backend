import { store as StoreAttributes } from '@type/ventas/store'
import { z } from 'zod'

const storeSchema = z.object({
  store_name: z
    .string()
    .max(100, 'El nombre de la tienda no debe exceder los 100 caracteres')
    .min(1, 'El nombre de la tienda es obligatorio')
    .regex(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s\-.,]+$/,
      'El nombre contiene caracteres no válidos',
    )
    .refine(
      (val) => !/^\s|\s$/.test(val),
      'El nombre no debe comenzar ni terminar con espacios en blanco',
    ),

  address: z
    .string()
    .max(200, 'La dirección no debe exceder los 200 caracteres')
    .min(1, 'La dirección es obligatoria')
    .refine(
      (val) => !/^\s|\s$/.test(val),
      'La dirección no debe comenzar ni terminar con espacios en blanco',
    ),

  observations: z
    .string()
    .max(300, 'Las observaciones no deben exceder los 300 caracteres')
    .optional()
    .refine(
      (val) =>
        val === undefined ||
        !/<script.*?>.*?<\/script>|SELECT\s.*?FROM|DROP\sTABLE|INSERT\sINTO|--|;|\\|\/\*/i.test(
          val,
        ),
      'Las observaciones contienen caracteres no permitidos o posibles inyecciones',
    ),
})

export const storeValidation = (data: StoreAttributes) =>
  storeSchema.safeParse(data)
