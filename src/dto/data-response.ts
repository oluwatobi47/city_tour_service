import { ApiProperty } from '@nestjs/swagger';

export class DataResponse<T> {

  @ApiProperty()
  valid?: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: T;

  constructor(message: string, data?: T, valid = true) {
    this.message = message;
    this.data = data;
    this.valid = valid;
  }
}
