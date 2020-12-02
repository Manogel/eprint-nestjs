import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @MaxLength(255)
  @IsString()
  name: string;

  @MaxLength(255)
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  profile: 'ADMIN' | 'USER' = 'USER';

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}
