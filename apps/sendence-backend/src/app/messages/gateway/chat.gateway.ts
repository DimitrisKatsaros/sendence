import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ACTION, RESULT } from '@sendence/common';
import { Server, Socket } from 'socket.io';
import { GatewayExceptionFilter } from '../../common/filters/gateway-exception.filter';
import { CreateMessageDto } from '../dto/create-message.dto';
import { MessagesService } from '../services/messages.service';

@UseFilters(GatewayExceptionFilter)
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4200',
    credentials: true,
  },
})
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
  public async handleMessage(@MessageBody() message: CreateMessageDto): Promise<void> {
    const createdMessage = await this._messagesService.create(message);
    this._server.emit(RESULT.MESSAGE_SENT, createdMessage);
  }
}
