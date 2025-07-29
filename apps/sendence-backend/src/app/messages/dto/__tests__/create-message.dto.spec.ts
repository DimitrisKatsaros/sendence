import { validate } from 'class-validator';
import { CreateMessageDto } from '../create-message.dto';

describe('CreateMessageDto', () => {
  it('should validate a correct dto', async () => {
    const dto = new CreateMessageDto();
    dto.message = 'Hello';
    dto.user = 'Sir CrashALot';
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation for missing fields', async () => {
    const dto = new CreateMessageDto();
    dto.user = 'Sir CrashALot';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
