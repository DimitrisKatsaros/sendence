import { IsString } from 'class-validator';
import { CreateMessage } from '@sendence/common';

export class CreateMessageDto implements CreateMessage {
  @IsString()
  message: string;

  @IsString()
  user: string;
}
