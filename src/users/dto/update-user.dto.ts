import { z } from 'zod';

export const updateUserSchema = z.object({
  nome: z
    .string()
    .min(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
    .optional(),
  email: z.string().email({ message: 'Email inválido' }).optional(),
  funcao: z.string().optional(),
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
