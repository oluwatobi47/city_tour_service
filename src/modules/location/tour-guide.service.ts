import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TourGuideRequest } from '../../models/tour-guide-request.model';
import { Model } from 'mongoose';

@Injectable()
export class TourGuideService {

  constructor(@InjectModel(TourGuideRequest.name) private readonly tourGuideModel: Model<TourGuideRequest>) {
  }

  getAllUserTourRequests() {

  }

  approveTourRequest() {

  }

  rejectTourRequest() {

  }

  sendRequestToGuide() {
    //TODO: Creates a notification
  }
}
