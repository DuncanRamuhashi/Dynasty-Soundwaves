import { z } from 'zod';


export const registerUserSchemaZod = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['user', 'seller', 'admin']).default('user'),
});

export const loginUserSchemaZod = z.object({
    email: z.string().email(),
    password: z.string(),
});
