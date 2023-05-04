import { ApiProperty } from '@nestjs/swagger';

export class DataResponse<T> {
  @ApiProperty()
  message: string;

  @ApiProperty()
  body: T;

  constructor(message: string, body?: T) {
    this.message = message;
    this.body = body;
  }
}
