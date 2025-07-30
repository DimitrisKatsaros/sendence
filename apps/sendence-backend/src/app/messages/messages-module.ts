import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';
import { MessagesService } from './services/messages.service';
import { MessagesController } from './controllers/messages.controller';
import { ChatGateway } from './gateway/chat.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  providers: [MessagesService, ChatGateway],
  controllers: [MessagesController],
  exports: [MessagesService],
})
export class MessagesModule {}
