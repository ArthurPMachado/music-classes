import { z } from 'zod'

export const tokenPayload = z.object({
  sub: z.string().uuid(),
  role: z.enum(['ADMIN', 'STUDENT']),
})

export type TokenPayload = z.infer<typeof tokenPayload>
