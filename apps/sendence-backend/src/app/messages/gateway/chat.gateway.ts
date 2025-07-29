import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Message } from '@sendence/api-interfaces';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('sendMessage')
  public handleMessage(@MessageBody() message: Message): void {
    this.server.emit('receiveMessage', message);
  }
}
