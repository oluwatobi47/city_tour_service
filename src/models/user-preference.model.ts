import mongoose from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';
import { City } from './city.model';
@Schema()
export class UserPreference {
  @Prop({ default: true })
  enableAppNotifications: boolean;

  @Prop({ default: false })
  enableEmailNotifications: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: City.name, required: false })
  activeCity: City;

  @Prop({ default: false })
  guideProfileActive: boolean;
}

