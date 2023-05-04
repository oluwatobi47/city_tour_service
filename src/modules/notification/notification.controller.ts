import { Controller, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import { NotificationService } from './notification.service';

@ApiTags('UserController')
@Controller('notification')
@UseFilters(new HttpExceptionFilter())
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {
  }

}
