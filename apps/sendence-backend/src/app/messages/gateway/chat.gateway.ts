import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from '../services/messages.service';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateMessageDto } from '../dto/create-message.dto';
import { GatewayExceptionFilter } from '../../common/filters/gateway-exception.filter';
import { ACTION, RESULT } from '@sendence/common';

@UseFilters(GatewayExceptionFilter)
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class ChatGateway {
  @WebSocketServer()
  private _server: Server;

  public constructor(private readonly _messagesService: MessagesService) {}

  public handleConnection(client: Socket): void {
    this._server.emit(RESULT.USER_CONNECTED, { clientId: client.id });
  }

  public handleDisconnect(client: Socket): void {
    this._server.emit(RESULT.USER_DISCONNECTED, { clientId: client.id });
  }

  @SubscribeMessage(ACTION.SEND_MESSAGE)
  public async handleMessage(
    @MessageBody() message: CreateMessageDto
  ): Promise<void> {
    const createdMessage = await this._messagesService.create(message);
    this._server.emit(RESULT.MESSAGE_SENT, createdMessage);
  }
}
