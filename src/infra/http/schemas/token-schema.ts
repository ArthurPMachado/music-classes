import { z } from 'zod'

export const tokenPayload = z.object({
  sub: z.string().uuid(),
})

export type TokenPayload = z.infer<typeof tokenPayload>
