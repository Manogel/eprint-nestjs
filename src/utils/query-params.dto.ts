import { IsOptional, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

const parseJsonString = (value: string) => {
  return JSON.parse(value);
};

export default class BaseQueryParamsDTO {
  @ApiPropertyOptional({
    type: 'string',
    description:
      'JavaScript Object Notation (JSON) string -> [column: string]: "param" ',
  })
  @IsOptional()
  @Transform(parseJsonString, { toClassOnly: true })
  where?: { [key: string]: any } = {};

  @ApiPropertyOptional({
    type: 'string',
    description:
      'JavaScript Object Notation (JSON) string -> [column: string]: 0 or 1',
  })
  @IsOptional()
  @Transform(parseJsonString, { toClassOnly: true })
  sort?: { [key: string]: number } = {};

  @ApiPropertyOptional({ default: 30 })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  perPage = 30;

  @ApiPropertyOptional({ default: 1 })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  page = 1;
}
