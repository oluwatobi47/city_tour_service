import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { SharedModule } from '../../shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Location, LocationSchema } from '../../models/location.model';
import { City, CitySchema } from '../../models/city.model';
import { TourGuideRequest, TourGuideRequestSchema } from '../../models/tour-guide-request.model';
import { LocationCategory, LocationCategorySchema } from '../../models/location-category.model';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      {
        name: Location.name,
        schema: LocationSchema,
      },
      {
        name: TourGuideRequest.name,
        schema: TourGuideRequestSchema,
      },
      {
        name: LocationCategory.name,
        schema: LocationCategorySchema
      }
    ]),
  ],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
