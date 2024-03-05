import { z } from 'zod'

export const getDataById = z.string().uuid()

export type GetDataById = z.infer<typeof getDataById>
