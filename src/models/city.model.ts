import { Coordinates } from './location.model';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type CityDocument = HydratedDocument<City>;

export class City {

  @Prop()
  name: string;

  @Prop()
  country: string;

  @Prop()
  province: string;

  @Prop()
  county: string;

  @Prop()
  areacode: string;

  @Prop()
  coordinates: Coordinates;
}

export const CitySchema = SchemaFactory.createForClass(City);
