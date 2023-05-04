import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApprovalStatus } from './enums/approval-status.enum';
import { City } from './city.model';

export type TourGuideRequestDocument = HydratedDocument<TourGuideRequest>;

export class TourGuideRequest {

  @Prop()
  id: string;

  @Prop()
  tourDate: Date;

  @Prop()
  dateRequested: Date;

  @Prop()
  tourApproved: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'City' })
  city: City;

  @Prop()
  status: ApprovalStatus;
}

export const TourGuideRequestSchema = SchemaFactory.createForClass(TourGuideRequest);
