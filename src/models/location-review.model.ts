import { User } from './user.model';
import { SchemaFactory } from '@nestjs/mongoose';

export class LocationReview {

  createdBy: User;

  rating: number;

  dateVisited: Date;

  reviewComments: string;
}

export const LocationReviewSchema = SchemaFactory.createForClass(LocationReview);
