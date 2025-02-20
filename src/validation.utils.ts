import {
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { z, ZodSchema } from 'zod';
import { Prisma } from '@prisma/client';

export function validateZodSchema<T>(schema: ZodSchema<T>, body: unknown): T {
  try {
    return schema.parse(body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestException(error.errors);
    }
    throw error;
  }
}

export async function validatePrismaErrors<T>(query: Promise<T>): Promise<T> {
  try {
    return await query;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          throw new ConflictException(
            `O campo '${error.meta?.target?.[0]}' já está em uso.`,
          );
        case 'P2016':
          throw new BadRequestException(
            `Registro não encontrado para o campo relacionado '${error.meta?.target?.[0]}'.`,
          );
        case 'P2003':
          throw new BadRequestException(
            `Valor inválido para o campo de chave estrangeira '${error.meta?.target?.[0]}'.`,
          );
        default:
          throw new InternalServerErrorException(
            'Ocorreu um erro ao interagir com o banco de dados.',
          );
      }
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      throw new BadRequestException('Erro de validação nos dados');
    } else if (error instanceof Prisma.PrismaClientInitializationError) {
      throw new InternalServerErrorException(
        'Erro de inicialização do banco de dados',
      );
    } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      throw new InternalServerErrorException(
        'Erro desconhecido na requisição ao banco de dados',
      );
    }

    throw error;
  }
}

export function validateAxiosError(
  message: string,
  error: unknown,
): BadRequestException {
  if (error instanceof Error) {
    throw new BadRequestException(`${message}: ${error.message}`);
  } else {
    throw new BadRequestException('Erro na requisição.');
  }
}
