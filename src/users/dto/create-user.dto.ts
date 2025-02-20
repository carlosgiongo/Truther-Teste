import { z } from 'zod';

export const createUserSchema = z
  .object({
    nome: z
      .string()
      .min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
    email: z.string().email({ message: 'Email inválido' }),
    senha: z
      .string()
      .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
    funcao: z.enum(['cliente', 'admin']).default('cliente'),
  })
  .strict();

export type CreateUserDto = z.infer<typeof createUserSchema>;
