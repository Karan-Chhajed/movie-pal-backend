import { z } from 'zod'

export const registerSchema = z.object({
    body: z.object({
        username: z.string().min(3).max(20),
        email: z.email(),
        password: z.string().min(6).max(100),
        region: z.string()
    })
})

export const loginSchema = z.object({
    body: z.object({
        username: z.string().min(3).max(100),
        password: z.string().min(6).max(100)
    })
    
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>