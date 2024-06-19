import { z } from 'zod'

export const forgotPasswordBodySchema = z.object({
  email: z.string().email(),
})

export type ForgotPasswordBodySchema = z.infer<typeof forgotPasswordBodySchema>
