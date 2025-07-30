import { IsString } from 'class-validator';
import { CreateMessage } from '@sendence/api-interfaces';

export class CreateMessageDto implements CreateMessage {
  @IsString()
  message: string;

  @IsString()
  user: string;
}
