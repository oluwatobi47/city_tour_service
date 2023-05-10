import { UserType } from '../../models/enums/user-type.enum';
import { UserPreferenceDTO } from './user-preference.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  username?: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  userType?: UserType;

  @ApiProperty()
  userPreference?: UserPreferenceDTO;
}
