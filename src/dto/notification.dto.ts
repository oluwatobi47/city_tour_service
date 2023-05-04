import { NotificationType } from '../models/enums/notification-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class NotificationDTO {

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  params: any;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  notificationType: NotificationType;

}
