import { z } from 'zod'

export const editAccountPermissionSchema = z.object({
  id: z.string().uuid(),
  status: z.string().refine((permission) => {
    const regexPattern = /^(true|false)$/i

    const isOfTypeBoolean = regexPattern.test(permission)

    console.log(isOfTypeBoolean)

    return isOfTypeBoolean
  }),
})

export type EditAccountPermissionSchema = z.infer<
  typeof editAccountPermissionSchema
>
