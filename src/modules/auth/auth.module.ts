import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@modules/user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import authConfig from '@config/auth';
import { HashModule } from '@providers/hash/hash.module';

@Module({
  imports: [
    UserModule,
    HashModule,
    PassportModule,
    JwtModule.register({
      secret: authConfig.secret,
      signOptions: { expiresIn: authConfig.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
