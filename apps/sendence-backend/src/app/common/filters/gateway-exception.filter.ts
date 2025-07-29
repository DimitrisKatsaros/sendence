import { ArgumentsHost, Catch, WsExceptionFilter } from '@nestjs/common';
import { Socket } from 'socket.io';

@Catch()
export class GatewayExceptionFilter implements WsExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const client = host.switchToWs().getClient<Socket>();
    const errorMessage = (exception as any).message || 'Validation error';
    client.emit('gatewayError', { error: errorMessage });
  }
}
