import { ApiProperty } from '@nestjs/swagger';
import { CityDto } from '../location/city.dto';

export class UserPreferenceDTO {
  @ApiProperty()
  enableEmailNotifications: boolean;

  @ApiProperty()
  enableAppNotifications: boolean;

  @ApiProperty()
  activeCity: CityDto;

  @ApiProperty()
  guideProfileActive: boolean;
}
