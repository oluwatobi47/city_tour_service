import { Coordinates } from '../../models/location.model';
import { ApiProperty } from '@nestjs/swagger';

export class CityDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  coordinates: Coordinates;
}
