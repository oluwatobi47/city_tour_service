import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { City } from './city.model';
import { LocationCategory } from './location-category.model';

export class Coordinates {
  latitude: number;
  longitude: number;
}

export class Image {
  id: string;
  imageUrl: string;
  description: string;
  label: string;
}

export class OperationalHours {
  opens: string;
  closes: string;
}

export type UserDocument = HydratedDocument<Location>;

@Schema({
  timestamps: true,
})
export class Location {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  address1: string;

  @Prop()
  address2: string;

  @Prop()
  postcode: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'City' })
  city: City;

  @Prop({ type: Object })
  operationalHours: OperationalHours;

  @Prop({ type: Object })
  coordinates: Coordinates;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: LocationCategory.name })
  locationCategory: LocationCategory;

  @Prop({type: Array})
  images: Image[];
}

export const LocationSchema = SchemaFactory.createForClass(Location);
