import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  MongooseModuleAsyncOptions,
  MongooseModuleOptions,
} from '@nestjs/mongoose';
import { Constants } from '../shared/constants';

class MongoConfig {
  constructor(private configService: ConfigService) {}

  getConfiguration(): MongooseModuleOptions {
    const [user, pass] = [
      this.configService.get('DB_USER'),
      this.configService.get('DB_PASSWORD'),
    ];

    return {
      dbName: this.configService.get('DB_NAME'),
      user,
      pass,
      uri: Constants.MONGO_URI.replace('<username>', user)
        .replace('<password>', pass),
    };
  }
}

export const MongoConfigOptions: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) =>
    new MongoConfig(configService).getConfiguration(),
  inject: [ConfigService],
};
