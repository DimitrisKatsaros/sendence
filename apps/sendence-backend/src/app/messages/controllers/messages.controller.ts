import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagesService } from '../services/messages.service';
import { MessageEntity } from '../entities/message.entity';
import { Message } from '@sendence/common';
import { CreateMessageDto } from '../dto/create-message.dto';

@Controller('messages')
export class MessagesController {
  public constructor(private readonly messagesService: MessagesService) {}

  @Post()
  public async create(
    @Body() createMessageDto: CreateMessageDto
  ): Promise<Message> {
    const message: MessageEntity = await this.messagesService.create(
      createMessageDto
    );
    return {
      id: message.id,
      message: message.message,
      user: message.user,
      timestamp: message.timestamp.toISOString(),
    };
  }

  @Get()
  public async findAll(): Promise<Message[]> {
    const messages: MessageEntity[] = await this.messagesService.findAll();
    return messages.map((message) => ({
      id: message.id,
      message: message.message,
      user: message.user,
      timestamp: message.timestamp.toISOString(),
    }));
  }
}
