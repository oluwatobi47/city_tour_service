import { ApprovalStatus } from '../../models/enums/approval-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class TourGuideRequestDTO {

  @ApiProperty()
  id: string;

  @ApiProperty()
  cityId: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  tourDate: Date;

  @ApiProperty()
  dateRequested: Date;

  @ApiProperty()
  tourApproved: boolean;

  @ApiProperty()
  status: ApprovalStatus;
}
