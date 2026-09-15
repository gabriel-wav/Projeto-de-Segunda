import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateAlunoDto } from './dto/create-aluno.dto.js';
import { UpdateAlunoDto } from './dto/update-aluno.dto.js';

@Injectable()
export class AlunosService {
  constructor(private readonly prisma: PrismaService) {}

  // C - Create (Criar)
  async create(createAlunoDto: CreateAlunoDto) {
    return await this.prisma.aluno.create({
      data: createAlunoDto,
    });
  }

  // R - Read (Listar todos)
  async findAll() {
    return await this.prisma.aluno.findMany();
  }

  // R - Read (Buscar apenas um por ID)
  async findOne(id: number) {
    const aluno = await this.prisma.aluno.findUnique({
      where: { id },
    });

    if (!aluno) {
      throw new NotFoundException(`Aluno com ID ${id} não encontrado`);
    }

    return aluno;
  }

  // U - Update (Atualizar)
  async update(id: number, updateAlunoDto: UpdateAlunoDto) {
    try {
      return await this.prisma.aluno.update({
        where: { id },
        data: updateAlunoDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Aluno com ID ${id} não encontrado`);
      }
      throw error;
    }
  }

  // D - Delete (Remover)
  async remove(id: number) {
    try {
      return await this.prisma.aluno.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Aluno com ID ${id} não encontrado`);
      }
      throw error;
    }
  }
}
