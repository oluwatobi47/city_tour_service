import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class LocationCategory {
  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const LocationCategorySchema = SchemaFactory.createForClass(LocationCategory);
