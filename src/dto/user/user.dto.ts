import { UserType } from '../../models/enums/user-type.enum';
import { UserPreferenceDTO } from './user-preference.dto';

export class UserDTO {

  id?: string;

  username: string;

  firstName: string;

  lastName: string;

  email: string;

  phone: string;

  userType: UserType;

  userPreference: UserPreferenceDTO;
}
