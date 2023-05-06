import { LatLngDto } from './lat-lng.dto';
import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { City } from '../../models/city.model';
import { LocationCategory } from '../../models/location-category.model';
import { Coordinates, Image, OperationalHours } from '../../models/location.model';

export class LocationDto {

  @Prop()
  id: string;

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
