import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AlunosService } from './alunos.service.js';
import { CreateAlunoDto } from './dto/create-aluno.dto.js';
import { UpdateAlunoDto } from './dto/update-aluno.dto.js';

@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // 201 Created
  async create(@Body() createAlunoDto: CreateAlunoDto) {
    return await this.alunosService.create(createAlunoDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK) // 200 OK
  @Header('Content-Type', 'text/html')
  async findAll() {
    const listaAlunos = await this.alunosService.findAll();

    // Transforma a lista de alunos em linhas de tabela HTML com mais espaço (padding)
    const linhasTabela = listaAlunos
      .map(
        (aluno) => `
      <tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors" style="border-bottom: 1px solid #f1f5f9;">
        <td class="px-6 py-4 text-center font-medium text-slate-900" style="padding: 16px 24px; text-align: center; color: #0f172a;">${aluno.id}</td>
        <td class="px-6 py-4 text-center text-slate-700" style="padding: 16px 24px; text-align: center; color: #334155;">${aluno.nome}</td>
        <td class="px-6 py-4 text-center text-slate-600 font-mono text-sm" style="padding: 16px 24px; text-align: center; color: #475569; font-family: monospace;">${aluno.email}</td>
        <td class="px-6 py-4 text-center text-slate-600" style="padding: 16px 24px; text-align: center; color: #475569;">${aluno.curso}</td>
      </tr>
    `,
      )
      .join('');

    // Retorna uma página HTML com elementos perfeitamente centralizados e espaçados
    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dashboard Acadêmico - NestJS</title>
        <!-- CORRIGIDO: Adicionado o cdn. para carregar o Tailwind corretamente -->
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-slate-100 font-sans min-h-screen flex items-center justify-center p-4" style="background-color: #f1f5f9; min-height: 100vh; display: flex; items-center: center; justify-content: center; padding: 16px; margin: 0; box-sizing: border-box;">
        
        <!-- Painel Centralizado -->
        <div class="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8 border border-slate-200/60" style="width: 100%; max-width: 896px; background-color: #ffffff; border-radius: 16px; padding: 32px; box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1); border: 1px solid #e2e8f0;">
          
          <!-- Cabeçalho -->
          <div class="flex items-center justify-between border-b border-slate-200 pb-5 mb-6" style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 24px;">
            <div>
              <h1 class="text-2xl font-bold text-slate-800 tracking-tight" style="font-size: 24px; font-weight: bold; color: #1e293b; margin: 0;">🚀 Sistema de Alunos</h1>
              <p class="text-sm text-slate-500 mt-1" style="font-size: 14px; color: #64748b; margin: 4px 0 0 0;">Gerenciamento de matrículas com NestJS</p>
            </div>
            <span class="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200" style="background-color: #d1fae5; color: #065f46; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 9999px;">API Ativa</span>
          </div>
          
          <p class="text-slate-600 mb-6 text-sm" style="color: #475569; font-size: 14px; margin-bottom: 24px;">
            Esta página demonstra o consumo da rota 
            <code class="bg-slate-100 text-rose-600 px-2 py-0.5 rounded font-mono text-xs border border-slate-200" style="background-color: #f1f5f9; color: #e11d48; padding: 2px 8px; border-radius: 4px; font-family: monospace;">GET /alunos</code> 
            renderizada dinamicamente.
          </p>
          
          <!-- Tabela Centralizada e Espaçada -->
          <div class="overflow-hidden border border-slate-200 rounded-xl bg-white" style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <table class="w-full text-sm text-left text-slate-500 table-fixed" style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <thead class="text-xs text-slate-700 uppercase bg-slate-50/70 border-b border-slate-200" style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; text-transform: uppercase; font-size: 12px;">
                <tr>
                  <th class="w-16 px-6 py-4 text-center font-semibold tracking-wider" style="width: 64px; padding: 16px 24px; text-align: center; color: #334155;">ID</th>
                  <th class="px-6 py-4 text-center font-semibold tracking-wider" style="padding: 16px 24px; text-align: center; color: #334155;">Nome</th>
                  <th class="px-6 py-4 text-center font-semibold tracking-wider" style="padding: 16px 24px; text-align: center; color: #334155;">E-mail</th>
                  <th class="px-6 py-4 text-center font-semibold tracking-wider" style="padding: 16px 24px; text-align: center; color: #334155;">Curso</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${
                  linhasTabela ||
                  `
                  <tr>
                    <td colspan="4" class="px-6 py-12 text-center text-slate-400 bg-slate-50/30" style="padding: 48px 24px; text-align: center; color: #94a3b8;">
                      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                        <span style="font-size: 24px;">📁</span>
                        <p style="font-weight: 500; color: #64748b; margin: 0;">Nenhum aluno cadastrado no momento.</p>
                        <p style="font-size: 12px; color: #94a3b8; margin: 0;">Use o Thunder Client ou Bloco de Notas para fazer um disparo POST!</p>
                      </div>
                    </td>
                  </tr>
                `
                }
              </tbody>
            </table>
          </div>
          
        </div>
      </body>
      </html>
    `;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK) // 200 OK
  async findOne(@Param('id') id: string) {
    return await this.alunosService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK) // 200 OK
  async update(@Param('id') id: string, @Body() updateAlunoDto: UpdateAlunoDto) {
    return await this.alunosService.update(+id, updateAlunoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content
  async remove(@Param('id') id: string) {
    await this.alunosService.remove(+id);
  }
}
