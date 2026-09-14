import { Module } from '@nestjs/common';
import { AlunosService } from './alunos.service.js';
import { AlunosController } from './alunos.controller.js';

@Module({
  controllers: [AlunosController],
  providers: [AlunosService],
})
export class AlunosModule {}
