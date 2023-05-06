import { ApiProperty } from '@nestjs/swagger';

export class LocationCategoryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
