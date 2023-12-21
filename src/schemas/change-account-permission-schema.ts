import { z } from 'zod'

export const changeAccountPermissionSchema = z.string().refine((permission) => {
  return permission.trim().length > 0
})

export type ChangeAccountPermissionSchema = z.infer<
  typeof changeAccountPermissionSchema
>
