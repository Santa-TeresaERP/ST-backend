import { PermissionsAttributes } from '@type/modules'
import { z } from 'zod'

const PermissionsSchema = z.object({
  id: z.string().uuid(),
  module_id: z.string().uuid(),
  canRead: z.boolean(),
  canWrite: z.boolean(),
  canEdit: z.boolean(),
  canDelete: z.boolean(),
})

export const permissionsValidation = (data: PermissionsAttributes) =>
  PermissionsSchema.safeParse(data)
