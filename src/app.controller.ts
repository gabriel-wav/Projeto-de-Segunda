import { Controller, Get, Header } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Header('Content-Type', 'text/html')
  getHello(): string {
    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Boas-vindas - NestJS</title>
        <script src="https://tailwindcss.com"></script>
      </head>
      <body class="bg-slate-100 font-sans min-h-screen flex items-center justify-center p-4" style="background-color: #f1f5f9; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 16px; margin: 0; box-sizing: border-box;">
        
        <!-- Cartão de Boas-vindas (Mesmo estilo do Painel) -->
        <div class="w-full max-w-xl bg-white shadow-xl rounded-2xl p-10 border border-slate-200/60 text-center" style="width: 100%; max-width: 576px; background-color: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1); border: 1px solid #e2e8f0; text-align: center;">
          
          <!-- Ícone/Emoji Central -->
          <div class="text-5xl mb-4" style="font-size: 48px; margin-bottom: 16px;">😁</div>
          
          <!-- Mensagem Principal -->
          <h1 class="text-3xl font-bold text-slate-800 tracking-tight mb-2" style="font-size: 30px; font-weight: bold; color: #1e293b; margin: 0 0 8px 0;">
            Olá, Classe!
          </h1>
          
          <p class="text-slate-600 mb-8 text-base leading-relaxed" style="color: #475569; font-size: 16px; margin-bottom: 32px; line-height: 1.6;">
            Bem-vindos ao projeto prático de demonstração. <br>
            Este sistema foi construído utilizando a arquitetura robusta do <strong>NestJS</strong> para testar o CRUD
          </p>
          
          <!-- Linha Divisória Suave -->
          <div class="border-t border-slate-100 my-6" style="border-top: 1px solid #f1f5f9; margin: 24px 0;"></div>
          
          <!-- Botão "Teste Aqui" com redirecionamento -->
          <a href="/alunos" class="inline-block bg-slate-800 text-white font-semibold px-8 py-3.5 rounded-xl shadow-md hover:bg-slate-700 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm tracking-wide" style="display: inline-block; background-color: #1e293b; color: #ffffff; font-weight: 600; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-size: 14px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); transition: all 0.2s;">
            Teste Aqui →
          </a>
          
        </div>
      </body>
      </html>
    `;
  }
}
