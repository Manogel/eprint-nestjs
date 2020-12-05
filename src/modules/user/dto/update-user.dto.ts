import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password', 'avatar']),
) {
  @ApiProperty({ type: 'boolean', required: false })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
