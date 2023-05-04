import { Body, Controller, HttpStatus, Param, Put, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import { UserService } from './user.service';
import { UserDTO } from '../../dto/user/user.dto';
import { DataResponse } from '../../dto/data-response';
import { UserPreferenceDTO } from '../../dto/user/user-preference.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard, Public } from '../../config/auth/jwt-auth.guard';

@ApiTags('UserController')
@Controller('user')
@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('/update-profile')
  updateUserInformation(@Res() response, @Body() userDto: UserDTO) {
    const updatedUser = this.userService.updateUser(userDto);
    return response.status(HttpStatus.OK).json(new DataResponse('Profile Updated Successfully', updatedUser));
  }

  @Put('/update-preference')
  async updateUserPreference(
    @Res() response,
    @Req() request,
    @Param('userId') userId: string,
    @Body() userPreference: UserPreferenceDTO
  ) {
    const update = await this.userService.updateUserPreference(request.user.id, userPreference);
    return response.status(HttpStatus.OK).json(new DataResponse('Preference Updated Successfully', update));
  }
}
