import { Body, Controller, HttpStatus, Post, Res, UseFilters } from '@nestjs/common';
import { UserRegistrationDto } from '../../dto/auth/user-registration.dto';
import { LoginResponseDto } from '../../dto/auth/login-response.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from '../../dto/auth/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import { DataResponse } from '../../dto/data-response';
import { ValidationPipe } from '../../pipes/ValidationPipe';

@ApiTags('Auth')
@Controller('auth')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Res() response, @Body(new ValidationPipe()) registration: UserRegistrationDto) {
    const newUser = await this.authService.signUp(registration);
    return response.status(HttpStatus.CREATED).json(new DataResponse('User created successfully!', newUser));
  }

  @Post('/sign-in')
  async signIn(@Res() response, @Body(new ValidationPipe()) loginDTO: LoginDTO) {
    const resp = await this.authService.signIn(loginDTO);
    return response.status(HttpStatus.OK).json(new DataResponse('', resp));
  }
}
