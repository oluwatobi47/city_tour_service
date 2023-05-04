import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseFilters, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import { LocationService } from './location.service';
import { DataResponse } from '../../dto/data-response';
import { SuggestLocationDTO } from '../../dto/location/suggest-location.dto';
import { LocationReviewDTO } from '../../dto/location/location-review.dto';
import { JwtAuthGuard } from '../../config/auth/jwt-auth.guard';

@ApiTags('LocationController')
@Controller('location')
@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
export class LocationController {
  constructor(private readonly locationService: LocationService) {
  }


  @Get('/find/:id')
  findLocation(@Res() response, @Param('id') id: string) {
    return response.status(HttpStatus.OK).json(new DataResponse('', 'Location Detail'));
  }

  @Post('/find-by-coord')
  findLocationsNear(@Res() response, @Body() geoQuery: any) {
    return response.status(HttpStatus.OK).json(new DataResponse('', [geoQuery]));
  }

  @Get('/categories')
  async getLocationCategories(@Res() response) {
    return response.status(HttpStatus.OK).json(new DataResponse('', []));
  }

  @Post('/bookmark/add/:locationId')
  async bookmarkLocation(@Res() response,  @Param('locationId') locationId: string) {
    return response.status(HttpStatus.OK).json(new DataResponse('', [locationId]));
  }

  @Post('/bookmark/remove/:locationId')
  async removeSavedLocation(@Res() response,  @Param('locationId') locationId: string) {
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
  async suggestLocation(@Res() response, @Body() newLocation: SuggestLocationDTO) {
    return response.status(HttpStatus.OK).json(new DataResponse('Suggestion Saved Successfully!', [newLocation]));
  }

  @Get('/suggested')
  async getAllSuggestedLocations(@Res() response) {
    return response.status(HttpStatus.OK).json(new DataResponse('', []));
  }

  @Get('/suggested/:userId')
  async getUserSuggestedLocations(@Res() response,  @Param('userId') userId: string) {
    return response.status(HttpStatus.OK).json(new DataResponse('', [userId]));
  }

}
