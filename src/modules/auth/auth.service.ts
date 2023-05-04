import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDTO } from '../../dto/user/user.dto';
import { UserRegistrationDto } from '../../dto/auth/user-registration.dto';
import { LoginDTO } from '../../dto/auth/login.dto';
import { LoginResponseDto } from '../../dto/auth/login-response.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(private userService: UserService,
              private jwtService: JwtService) {
  }

  async signUp(userRegistration: UserRegistrationDto): Promise<UserDTO> {
    return this.userService.createNewUser(userRegistration);
  }

  async signIn(loginDTO: LoginDTO): Promise<LoginResponseDto> {
    const user = await this.userService.findUserByEmail(loginDTO.username);
    if (!user) {
      throw new NotFoundException({ key: 'username', message: 'user does not exist' }, 'User does not exist');
    }

    // TODO: Use bcrypt to encode and compare hash value instead
    if (user.password !== loginDTO.password) {
      throw new BadRequestException({ key: 'password', message: 'Invalid password' }, 'Wrong credentials entered');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = this.userService.mapToDTO(user);
    const token = this.jwtService.sign({email: result.email, id: result.id, role: result.userType})
    return { user: result, token };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findUserByEmail(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

}
