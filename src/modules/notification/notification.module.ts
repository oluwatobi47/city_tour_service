import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { SharedModule } from '../../shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from '../../models/notification.model';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      {
        name: Notification.name,
        schema: NotificationSchema
      }
    ])
  ],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
