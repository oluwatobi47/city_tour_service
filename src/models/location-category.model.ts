import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class LocationCategory {
  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const LocationCategorySchema = SchemaFactory.createForClass(LocationCategory);
