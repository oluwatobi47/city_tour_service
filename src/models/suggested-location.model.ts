import { Location } from './location.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.model';
import mongoose from 'mongoose';

@Schema()
export class SuggestedLocation extends Location {
  @Prop()
  comments: string;

  @Prop()
  geoName: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  createdBy: User;
}
const schema = SchemaFactory.createForClass(SuggestedLocation);
export const SuggestedLocationSchema = schema.index({'coordinates': '2dsphere'});
