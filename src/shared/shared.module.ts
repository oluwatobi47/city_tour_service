import { Module } from '@nestjs/common';
import { UtilService } from './services/util.service';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from '../models/city.model';
import { UserService } from '../modules/user/user.service';
import { User, UserSchema } from '../models/user.model';

const SHARED_SCHEMAS = MongooseModule.forFeature([
  {
    name: City.name,
    schema: CitySchema,
  },
  {
    name: User.name,
    schema: UserSchema,
  },
]);

@Module({
  imports: [ SHARED_SCHEMAS ],
  providers: [UtilService, UserService],
  exports: [
    UtilService,
    UserService,
    SHARED_SCHEMAS
  ],
})
export class SharedModule {}
