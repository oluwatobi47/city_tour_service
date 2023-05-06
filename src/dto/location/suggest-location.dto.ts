import { Coordinates, Image } from '../../models/location.model';
import { ApiProperty } from '@nestjs/swagger';
export class SuggestLocationDTO {

  @ApiProperty()
  address1: string;

  @ApiProperty()
  address2: string;

  @ApiProperty()
  coordinates: Coordinates;

  @ApiProperty()
  geoName: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  images: Image[];

  @ApiProperty()
  locationCategoryId: string;

  @ApiProperty()
  locationCategory: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  postcode: string;

  @ApiProperty()
  comments: string;
}
