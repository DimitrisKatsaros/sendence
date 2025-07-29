import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from '../messages.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MessageEntity } from '../../entities/message.entity';

const mockRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
});

interface Ctx {
  service: MessagesService;
  mockMessageRepository: ReturnType<typeof mockRepository>;
}

describe('MessagesService', () => {
  beforeEach(async function (this: Ctx) {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: getRepositoryToken(MessageEntity),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    this.service = module.get<MessagesService>(MessagesService);
    this.mockMessageRepository = module.get(getRepositoryToken(MessageEntity));
  });

  it('should be defined', function (this: Ctx) {
    expect(this.service).toBeDefined();
  });

  it('should create a message', async function (this: Ctx) {
    const dto = { message: 'Hello', user: 'user1' };
    const created = { ...dto, id: 1 };
    this.mockMessageRepository.create.mockReturnValue(created);
    this.mockMessageRepository.save.mockResolvedValue(created);
    const result = await this.service.create(dto);
    expect(this.mockMessageRepository.create).toHaveBeenCalledWith(dto);
    expect(this.mockMessageRepository.save).toHaveBeenCalledWith(created);
    expect(result).toEqual(created);
  });

  it('should find all messages', async function (this: Ctx) {
    const messages = [{ id: 1, message: 'Hello', user: 'user1' }];
    this.mockMessageRepository.find.mockResolvedValue(messages);
    const result = await this.service.findAll();
    expect(this.mockMessageRepository.find).toHaveBeenCalledWith({
      order: { timestamp: 'DESC' },
    });
    expect(result).toEqual(messages);
  });
});
