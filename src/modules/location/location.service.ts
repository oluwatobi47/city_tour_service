import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LocationCategory } from '../../models/location-category.model';
import { Model } from 'mongoose';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel('LocationCategory') private locationCategoryModel: Model<LocationCategory>,
    @InjectModel('Location') private locationModel: Model<Location>
  ) {}
}
