import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from '../chat.gateway';
import { MessagesService } from '../../services/messages.service';
import { CreateMessageDto } from '../../dto/create-message.dto';
import { Server, Socket } from 'socket.io';

const mockMessagesService = {
  create: jest.fn(),
};

const mockServer = {
  emit: jest.fn(),
};

const MOCK_MESSAGE_DTO: CreateMessageDto = {
  message: 'Hello',
  user: 'Sir CrashALot',
};

const MOCK_CREATED_MESSAGE = {
  id: '1',
  message: 'Hello',
  user: 'Sir CrashALot',
  timestamp: new Date('2025-07-30T12:00:00Z'),
};

interface Ctx {
  gateway: ChatGateway;
  messagesService: typeof mockMessagesService;
  server: typeof mockServer;
  client: Partial<Socket>;
}

describe('ChatGateway', () => {
  beforeEach(async function (this: Ctx) {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatGateway,
        {
          provide: MessagesService,
          useValue: mockMessagesService,
        },
      ],
    }).compile();

    this.gateway = module.get<ChatGateway>(ChatGateway);
    this.messagesService = module.get(MessagesService);
    this.gateway['_server'] = mockServer as unknown as Server;
    this.client = { id: 'client1' };
    jest.clearAllMocks();
  });

  it('should be defined', function (this: Ctx) {
    expect(this.gateway).toBeDefined();
  });

  it('should handle connection', function (this: Ctx) {
    this.gateway.handleConnection(this.client as Socket);
    expect(mockServer.emit).toHaveBeenCalledWith('userConnected', {
      clientId: 'client1',
    });
  });

  it('should handle disconnect', function (this: Ctx) {
    this.gateway.handleDisconnect(this.client as Socket);
    expect(mockServer.emit).toHaveBeenCalledWith('userDisconnected', {
      clientId: 'client1',
    });
  });

  it('should handle message', async function (this: Ctx) {
    this.messagesService.create.mockResolvedValue(MOCK_CREATED_MESSAGE);
    await this.gateway.handleMessage(MOCK_MESSAGE_DTO);
    expect(this.messagesService.create).toHaveBeenCalledWith(MOCK_MESSAGE_DTO);
    expect(mockServer.emit).toHaveBeenCalledWith(
      'messageSend',
      MOCK_CREATED_MESSAGE
    );
  });

  it('should handle service error on message', async function (this: Ctx) {
    this.messagesService.create.mockRejectedValue(new Error('Service error'));
    await expect(this.gateway.handleMessage(MOCK_MESSAGE_DTO)).rejects.toThrow(
      'Service error'
    );
  });
});
