import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3333),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  BASE_URL: z.string().url(),
  RESET_PATH: z.string(),
})

export type Env = z.infer<typeof envSchema>
