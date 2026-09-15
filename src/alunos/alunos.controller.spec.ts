import { Test, TestingModule } from '@nestjs/testing';
import { AlunosController } from './alunos.controller.js';
import { AlunosService } from './alunos.service.js';

describe('AlunosController', () => {
  let controller: AlunosController;

  const mockAlunosService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlunosController],
      providers: [
        {
          provide: AlunosService,
          useValue: mockAlunosService,
        },
      ],
    }).compile();

    controller = module.get<AlunosController>(AlunosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
