import * as z from 'zod'

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const userRegisterSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
})
