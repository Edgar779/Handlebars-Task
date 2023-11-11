import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ReorderDTO {
  @ApiProperty()
  @Type(() => Number)
  from: number;
  @ApiProperty()
  @Type(() => Number)
  to: number;
}
