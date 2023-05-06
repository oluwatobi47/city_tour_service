import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import { LocationService } from './location.service';
import { DataResponse } from '../../dto/data-response';
import { SuggestLocationDTO } from '../../dto/location/suggest-location.dto';
import { LocationReviewDTO } from '../../dto/location/location-review.dto';
import { JwtAuthGuard, Public } from '../../config/auth/jwt-auth.guard';
import { SuggestLocationService } from './suggest-location.service';
import { Coordinates } from '../../models/location.model';

@ApiTags('LocationController')
@Controller('location')
@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
    private suggestLocationService: SuggestLocationService
  ) {}

  @Get('/find/:id')
  findLocation(@Res() response, @Param('id') id: string) {
    return response.status(HttpStatus.OK).json(new DataResponse('', 'Location Detail'));
  }

  @Post('/find-by-coord')
  @Public()
  findLocationsNear(@Res() response, @Body() geoQuery: any) {
    return response.status(HttpStatus.OK).json(new DataResponse('', [geoQuery]));
  }

  @Get('/categories')
  @Public()
  async getLocationCategories(@Res() response) {
    return response.status(HttpStatus.OK).json(new DataResponse('', []));
  }

  @Post('/bookmark/add/:locationId')
  async bookmarkLocation(@Res() response, @Param('locationId') locationId: string) {
    return response.status(HttpStatus.OK).json(new DataResponse('', [locationId]));
  }

  @Post('/bookmark/remove/:locationId')
  async removeSavedLocation(@Res() response, @Param('locationId') locationId: string) {
    return response.status(HttpStatus.OK).json(new DataResponse('', [locationId]));
  }

  @Get('/bookmark/:userId')
  async getUserBookmarkedLocations(@Res() response, @Param('userId') userId: string) {
    return response.status(HttpStatus.OK).json(new DataResponse('', [userId]));
  }

  @Post('/review/save')
  async saveLocationReview(@Res() response, @Body() locationReview: LocationReviewDTO) {
    return response.status(HttpStatus.OK).json(new DataResponse('Review saved successfully', [locationReview]));
  }

  @Get('/reviews')
  async getLocationReviews(@Res() response) {
    return response.status(HttpStatus.OK).json(new DataResponse('', []));
  }

  @Post('/suggest')
  async suggestLocation(@Res() response, @Req() request, @Body() newLocation: SuggestLocationDTO) {
    const loc = await this.suggestLocationService.saveSuggestedLocation(request.user?.id, newLocation);
    return response.status(HttpStatus.OK).json(new DataResponse('Suggestion Saved Successfully!', loc));
  }

  @Post('/suggestions/near')
  async getSuggestedLocationsNearCoords(@Res() response, @Req() request, @Body() coords: Coordinates) {
    const loc = await this.suggestLocationService.getLocationsNear(coords);
    return response.status(HttpStatus.OK).json(new DataResponse('', loc));
  }

  @Get('/suggested/user')
  async getUserSuggestedLocations(@Res() response, @Req() request) {
    const result = await this.suggestLocationService.getAllUserSuggestedLocations(request.user.id)
    return response.status(HttpStatus.OK).json(new DataResponse('', result));
  }
}
