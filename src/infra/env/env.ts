import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  APP_PORT: z.coerce.number().optional().default(3333),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  BASE_URL: z.string().url(),
  RESET_URL: z.string().url(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USERNAME: z.string(),
  SMTP_PASSWORD: z.string(),
  HASH_SALT: z.coerce.number().default(14),
})

export type Env = z.infer<typeof envSchema>
