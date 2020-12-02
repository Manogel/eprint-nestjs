import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @MaxLength(255)
  @IsString()
  name: string;

  @ApiProperty()
  @MaxLength(255)
  @IsEmail()
  email: string;

  @ApiProperty({
    required: false,
    enum: ['ADMIN', 'USER'],
  })
  @IsString()
  @IsOptional()
  profile: 'ADMIN' | 'USER' = 'USER';

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsString()
  @IsOptional()
  avatar?: string;
}
