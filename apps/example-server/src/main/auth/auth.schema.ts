import { z } from 'zod'
import { userTypeEnum } from '../../core/db/schema'

export const zLogin = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const zRegister = z.object({
    email: z.string().email(),
    password: z.string(),
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    type: z.enum(userTypeEnum.enumValues).optional().default('user'),
})

export const zChangePassword = z.object({
    userId: z.coerce.number(),
    currentPassword: z.string(),
    password: z.string().min(8).max(32),
})

export const zForgotPassword = z.object({
    email: z.string().email(),
})

export const zResetPassword = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(32),
})
