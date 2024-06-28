import { z } from 'zod'
import { userTypeEnum } from '../db/schema'

export const zLogin = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const zRegister = z.object({
    email: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    type: z.enum(userTypeEnum.enumValues).optional().default('user'),
})
