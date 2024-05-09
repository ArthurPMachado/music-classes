import { z } from 'zod'

export const createStudentSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

export type CreateStudentSchema = z.infer<typeof createStudentSchema>
