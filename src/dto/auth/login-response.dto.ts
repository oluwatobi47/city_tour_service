import { UserDTO } from '../user/user.dto';

export interface LoginResponseDto {
  user: UserDTO;
  token: any;
}
