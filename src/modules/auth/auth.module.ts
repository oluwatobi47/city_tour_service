import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SharedModule } from '../../shared/shared.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../config/auth/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    SharedModule,
    ConfigModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: config.get('JWT_EXPIRATION') },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
