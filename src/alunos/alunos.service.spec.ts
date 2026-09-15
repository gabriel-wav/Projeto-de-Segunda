import { Test, TestingModule } from '@nestjs/testing';
import { AlunosService } from './alunos.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('AlunosService', () => {
  let service: AlunosService;

  const mockPrismaService = {
    aluno: {
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlunosService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<AlunosService>(AlunosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
