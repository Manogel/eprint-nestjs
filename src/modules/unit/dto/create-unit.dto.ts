import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateUnitDto {
  @ApiProperty()
  @MaxLength(255)
  @IsString()
  name: string;
}
