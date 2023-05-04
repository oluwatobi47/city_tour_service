import { Location } from './location.model';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.model';
import mongoose from 'mongoose';

export class SuggestedLocation extends Location {
  @Prop()
  comments: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  createdBy: User;

}
export const SuggestedLocationSchema = SchemaFactory.createForClass(SuggestedLocation);
