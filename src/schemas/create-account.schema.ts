import { z } from 'zod'

export const createAccountSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
})

export type CreateAccountSchema = z.infer<typeof createAccountSchema>
