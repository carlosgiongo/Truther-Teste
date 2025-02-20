import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, createUserSchema } from './dto/create-user.dto';
import { UpdateUserDto, updateUserSchema } from './dto/update-user.dto';
import { validatePrismaErrors, validateZodSchema } from 'src/validation.utils';
import { hashPassword } from 'src/auth.utils';
import { ZodSchema } from 'zod';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  userSelect = {
    id: true,
    nome: true,
    email: true,
    funcao: true,
  };

  findAll(search: string) {
    if (search) {
      return this.prisma.user.findMany({
        where: {
          OR: [
            { nome: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
          ],
        },
        select: this.userSelect,
      });
    }

    return this.prisma.user.findMany({
      select: this.userSelect,
    });
  }

  findOne(id: string) {
    return validatePrismaErrors(
      this.prisma.user.findUnique({
        where: { id: parseInt(id) },
        select: this.userSelect,
      }),
    );
  }

  async create(data: CreateUserDto) {
    const validatedData = validateZodSchema<CreateUserDto>(
      createUserSchema as ZodSchema<CreateUserDto>,
      data,
    );

    return validatePrismaErrors(
      this.prisma.user.create({
        data: {
          nome: validatedData.nome,
          email: validatedData.email,
          funcao: validatedData.funcao,
          senha: await hashPassword(validatedData.senha),
        },
        select: this.userSelect,
      }),
    );
  }

  update(id: string, data: UpdateUserDto) {
    const validatedData = validateZodSchema<UpdateUserDto>(
      updateUserSchema,
      data,
    );

    return validatePrismaErrors(
      this.prisma.user.update({
        where: { id: parseInt(id) },
        data: validatedData,
        select: this.userSelect,
      }),
    );
  }

  remove(id: string) {
    return validatePrismaErrors(
      this.prisma.user.delete({
        where: { id: parseInt(id) },
        select: this.userSelect,
      }),
    );
  }
}
