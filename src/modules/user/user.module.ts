import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { SharedModule } from '../../shared/shared.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SharedModule, AuthModule],
  controllers: [UserController],
})
export class UserModule {}
