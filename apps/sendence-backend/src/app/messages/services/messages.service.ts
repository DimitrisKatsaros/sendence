import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from '../entities/message.entity';
import { CreateMessageDto } from '../dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<MessageEntity> {
    const message = this.messageRepository.create(createMessageDto);
    return this.messageRepository.save(message);
  }

  async findAll(): Promise<MessageEntity[]> {
    return this.messageRepository.find({
      order: { timestamp: 'DESC' },
    });
  }
}
