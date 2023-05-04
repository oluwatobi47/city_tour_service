import { Location } from './location.model';
import { User } from './user.model';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export class UserLocation {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Location.name })
  location: Location;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop()
  dateSaved: Date;
}
export const UserLocationSchema = SchemaFactory.createForClass(UserLocation);
