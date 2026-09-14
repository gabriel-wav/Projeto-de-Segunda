import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto.js';
import { UpdateAlunoDto } from './dto/update-aluno.dto.js';
import { Aluno } from './entities/aluno.entity.js';

@Injectable()
export class AlunosService {
  // Nosso "banco de dados" fake na memória
  private alunos: Aluno[] = [];
  private idCounter = 1;

  // C - Create (Criar)
  create(createAlunoDto: CreateAlunoDto): Aluno {
    const novoAluno: Aluno = {
      id: this.idCounter++,
      ...createAlunoDto,
    };
    this.alunos.push(novoAluno);
    return novoAluno;
  }

  // R - Read (Ler todos)
  findAll(): Aluno[] {
    return this.alunos;
  }

  // R - Read (Ler apenas um por ID)
  findOne(id: number): Aluno {
    const aluno = this.alunos.find((a) => a.id === id);
    if (!aluno) {
      throw new NotFoundException(`Aluno com ID ${id} não encontrado`);
    }
    return aluno;
  }

  // U - Update (Atualizar)
  update(id: number, updateAlunoDto: UpdateAlunoDto): Aluno {
    const aluno = this.findOne(id); // Já valida se existe
    const index = this.alunos.findIndex((a) => a.id === id);
    
    this.alunos[index] = {
      ...aluno,
      ...updateAlunoDto,
    };
    
    return this.alunos[index];
  }

  // D - Delete (Remover)
  remove(id: number): { message: string } {
    this.findOne(id); // Já valida se existe
    this.alunos = this.alunos.filter((a) => a.id !== id);
    return { message: `Aluno com ID ${id} removido com sucesso` };
  }
}
