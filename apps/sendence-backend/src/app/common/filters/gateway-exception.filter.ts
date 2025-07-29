import { ArgumentsHost, Catch, WsExceptionFilter } from '@nestjs/common';
import { Socket } from 'socket.io';

@Catch()
export class GatewayExceptionFilter implements WsExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const client = host.switchToWs().getClient<Socket>();
    let errorMessage = 'Validation error';

    if (
      typeof exception === 'object' &&
      exception !== null &&
      'message' in exception
    ) {
      errorMessage =
        (exception as { message?: string }).message || errorMessage;
    }

    client.emit('gatewayError', { error: errorMessage });
  }
}
