import { NotificationType } from './enums/notification-type.enum';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.model';
import { Location } from './location.model';

export class Notification {

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Object })
  params: any;

  @Prop()
  date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop()
  notificationType: NotificationType;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
