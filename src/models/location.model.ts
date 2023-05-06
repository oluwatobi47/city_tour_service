import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, IndexDefinition } from 'mongoose';
import { City } from './city.model';
import { LocationCategory } from './location-category.model';
import { ApiProperty } from '@nestjs/swagger';

export class Coordinates {
  @ApiProperty()
  latitude: number;

  @ApiProperty()
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

@Schema()
export class Point {
  @Prop({type: String, default: 'Point'})
  type: string;

  @Prop({type: [Number], index: '2dsphere'})
  coordinates: Array<number>;
}


export type UserDocument = HydratedDocument<Location>;

@Schema({
  timestamps: true,
})
export class Location{
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

  @Prop({ type: {type: String, default: 'Point'}, coordinates: {type: [Number]} })
  coordinates: Point;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: LocationCategory.name })
  locationCategory: LocationCategory;

  @Prop({type: Array})
  images: Image[];
}
const schema = SchemaFactory.createForClass(Location);
export const LocationSchema = schema.index({'coordinates': '2dsphere'});
