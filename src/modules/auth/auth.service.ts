import { User } from '@modules/user/entities/user.entity';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayloadDto } from './dtos/jwtpayload-dto';
import { SigninDto } from './dtos/signin-dto';
import { BcryptService } from '@providers/bcrypt/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new UnauthorizedException('Email ou senha incorretos');

    const passwordIsValid = await this.bcryptService.compareHash(
      password,
      user.password,
    );

    if (!passwordIsValid)
      throw new UnauthorizedException('Email ou senha incorretos');

    return user;
  }

  async generateToken(user: User) {
    const payload = {
      userId: user.id,
    } as JwtPayloadDto;

    return this.jwtService.sign(payload);
  }

  async signin(credentials: SigninDto) {
    const { email, password } = credentials;

    const user = await this.validateUser(email, password);
    const token = await this.generateToken(user);

    return {
      token,
      user,
    };
  }
}
