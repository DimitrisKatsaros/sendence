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

@UseFilters(GatewayExceptionFilter)
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) //TODO: need to show some error message to the user if validation fails
@WebSocketGateway()
export class ChatGateway {
  public constructor(private readonly _messagesService: MessagesService) {}

  @WebSocketServer()
  private _server: Server;

  public handleConnection(client: Socket): void {
    console.log(`Client connected: ${client.id}`);
    this._server.emit('userConnected', { clientId: client.id });
  }

  public handleDisconnect(client: Socket): void {
    console.log(`Client disconnected: ${client.id}`);
    this._server.emit('userDisconnected', { clientId: client.id });
  }

  @SubscribeMessage('sendMessage')
  public async handleMessage(
    @MessageBody() message: CreateMessageDto
  ): Promise<void> {
    const createdMessage = await this._messagesService.create(message);
    this._server.emit('messageSend', createdMessage);
  }
}
