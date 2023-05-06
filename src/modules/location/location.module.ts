import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { SharedModule } from '../../shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Location, LocationSchema } from '../../models/location.model';
import { TourGuideRequest, TourGuideRequestSchema } from '../../models/tour-guide-request.model';
import { LocationCategory, LocationCategorySchema } from '../../models/location-category.model';
import { SuggestedLocation, SuggestedLocationSchema } from '../../models/suggested-location.model';
import { SuggestLocationService } from './suggest-location.service';

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
      },
      {
        name: SuggestedLocation.name,
        schema: SuggestedLocationSchema
      }
    ]),
  ],
  controllers: [LocationController],
  providers: [LocationService, SuggestLocationService],
})
export class LocationModule {}
