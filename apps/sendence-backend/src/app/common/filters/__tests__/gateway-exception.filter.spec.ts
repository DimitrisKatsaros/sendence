import { GatewayExceptionFilter } from '../gateway-exception.filter';
import { ArgumentsHost } from '@nestjs/common';
import { Socket } from 'socket.io';

interface Ctx {
  filter: GatewayExceptionFilter;
  mockClient: Socket;
  mockHost: ArgumentsHost;
}

describe('GatewayExceptionFilter', () => {
  beforeEach(function (this: Ctx) {
    this.filter = new GatewayExceptionFilter();
    this.mockClient = { emit: jest.fn() } as unknown as Socket;
    this.mockHost = {
      switchToWs: () => ({ getClient: () => this.mockClient }),
    } as unknown as ArgumentsHost;
  });

  it('should emit gatewayError with exception message', function (this: Ctx) {
    const exception = { message: 'Custom error' };
    this.filter.catch(exception, this.mockHost);
    expect(this.mockClient.emit).toHaveBeenCalledWith('gatewayError', {
      error: 'Custom error',
    });
  });

  it('should emit gatewayError with default message if none provided', function (this: Ctx) {
    const exception = {};
    this.filter.catch(exception, this.mockHost);
    expect(this.mockClient.emit).toHaveBeenCalledWith('gatewayError', {
      error: 'Validation error',
    });
  });
});
