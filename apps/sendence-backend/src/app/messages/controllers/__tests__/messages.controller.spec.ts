import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from '../messages.controller';
import { MessagesService } from '../../services/messages.service';
import { CreateMessageDto } from '../../dto/create-message.dto';
import { MessageEntity } from '../../entities/message.entity';

const mockMessagesService = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
});

const MOCK_MESSAGE_DTO: CreateMessageDto = {
  message: 'Hello',
  user: 'user1',
};

const MOCK_INVALID_MESSAGE_DTO = {
  message: 'Hello',
};

const MOCK_MESSAGE_ENTITY: MessageEntity = {
  id: '1',
  message: 'Hello',
  user: 'Sir CrashALot',
  timestamp: new Date('2025-07-29T12:00:00Z'),
};

const MOCK_MESSAGE_RESULT = {
  id: '1',
  message: 'Hello',
  user: 'Sir CrashALot',
  timestamp: '2025-07-29T12:00:00.000Z',
};

interface Ctx {
  controller: MessagesController;
  mockMessagesService: ReturnType<typeof mockMessagesService>;
}

describe('MessagesController', () => {
  beforeEach(async function (this: Ctx) {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: MessagesService,
          useFactory: mockMessagesService,
        },
      ],
    }).compile();

    this.controller = module.get<MessagesController>(MessagesController);
    this.mockMessagesService = module.get(MessagesService);
  });

  it('should be defined', function (this: Ctx) {
    expect(this.controller).toBeDefined();
  });

  it('should handle service errors on create', async function (this: Ctx) {
    this.mockMessagesService.create.mockRejectedValue(
      new Error('Service error')
    );
    await expect(this.controller.create(MOCK_MESSAGE_DTO)).rejects.toThrow(
      'Service error'
    );
  });

  it('should create a message', async function (this: Ctx) {
    this.mockMessagesService.create.mockResolvedValue(MOCK_MESSAGE_ENTITY);
    const result = await this.controller.create(MOCK_MESSAGE_DTO);
    expect(this.mockMessagesService.create).toHaveBeenCalledWith(
      MOCK_MESSAGE_DTO
    );
    expect(result).toEqual(MOCK_MESSAGE_RESULT);
  });

  it('should throw error for invalid DTO', async function (this: Ctx) {
    await expect(
      this.controller.create(MOCK_INVALID_MESSAGE_DTO as CreateMessageDto)
    ).rejects.toThrow();
  });

  it('should find all messages', async function (this: Ctx) {
    this.mockMessagesService.findAll.mockResolvedValue([MOCK_MESSAGE_ENTITY]);
    const result = await this.controller.findAll();
    expect(this.mockMessagesService.findAll).toHaveBeenCalled();
    expect(result).toEqual([MOCK_MESSAGE_RESULT]);
  });
});
