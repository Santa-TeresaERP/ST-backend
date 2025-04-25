import { PermissionsAttributes } from '@type/user/permissions'
import { z } from 'zod'

const PermissionsSchema = z.object({
  id: z.string().uuid('El ID debe ser un UUID válido').optional(),

  moduleId: z.string().uuid('El ID del módulo debe ser un UUID válido'),

  canRead: z.boolean().optional().default(false),

  canWrite: z.boolean().optional().default(false),

  canEdit: z.boolean().optional().default(false),

  canDelete: z.boolean().optional().default(false),
})

export const permissionsValidation = (data: PermissionsAttributes) =>
  PermissionsSchema.safeParse(data)
