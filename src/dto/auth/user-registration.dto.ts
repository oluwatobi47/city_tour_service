import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UserRegistrationDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  confirmPassword: string;
}
