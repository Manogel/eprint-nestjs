import { CreateUnitDto } from './create-unit.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateUnitDto extends PartialType(CreateUnitDto) {
  @ApiProperty({ type: 'boolean', required: false })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
