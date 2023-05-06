import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SuggestedLocation } from '../../models/suggested-location.model';
import { LocationCategory } from '../../models/location-category.model';
import { Model } from 'mongoose';
import { SuggestLocationDTO } from '../../dto/location/suggest-location.dto';
import { Entity } from '../../shared/types/model';
import { User } from '../../models/user.model';
import { UserDTO } from '../../dto/user/user.dto';
import { UserPreference } from '../../models/user-preference.model';
import { UtilService } from '../../shared/services/util.service';
import { Coordinates } from '../../models/location.model';

@Injectable()
export class SuggestLocationService {
  constructor(@InjectModel('SuggestedLocation') private sgLocationModel: Model<SuggestedLocation>,
              private utilService: UtilService,
              @InjectModel('LocationCategory') private locationCategoryModel: Model<LocationCategory>) {
  }

  saveSuggestedLocation(userId: string, locationDto: SuggestLocationDTO): Promise<SuggestLocationDTO> {
    const location = new this.sgLocationModel();
    location.set(locationDto)
      .set('locationCategory', locationDto.locationCategoryId)
      .set('createdBy', userId)
      .set('coordinates', {
        type: 'Point',
        coordinates: [locationDto.coordinates.latitude, locationDto.coordinates.longitude]
      });
    return location.save().then((loc) => {
      return this.mapToDTO(loc.toObject());
    });
  }

  getLocationsNear(coords: Coordinates): Promise<Array<SuggestLocationDTO>> {
    const coord = {
      type: 'Point',
      coordinates: [coords.latitude, coords.longitude]
    }
    return this.sgLocationModel
      .find()
      .where('coordinates')
      .near({ center: coord, maxDistance: 10000 })
      .then((res) => {
        return res.length ? res.map((doc) => this.mapToDTO(doc.toObject())) : [];
      });
  }

  getAllUserSuggestedLocations(userId: string): Promise<Array<SuggestLocationDTO>> {
    return this.sgLocationModel
      .find({ createdBy: { $eq: userId } })
      .exec()
      .then((res) => {
        return res.length ? res.map(doc => this.mapToDTO(doc.toObject())) : [];
      });
  }

  mapToDTO(location: Entity<SuggestedLocation>): SuggestLocationDTO {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, __v, ...locationDTO } = location;
    return {
      ...this.utilService.removeKeys(locationDTO, ['createdBy', 'city', 'operationalHours', 'locationCategory']),
      id: _id.toString(),
      locationCategoryId: (<Entity<LocationCategory>>locationDTO.locationCategory)?._id?.toString(),
      locationCategory: (<Entity<LocationCategory>>locationDTO.locationCategory)?.name,
      coordinates: (location.coordinates?.coordinates?.length ? {
        latitude: location.coordinates.coordinates[0],
        longitude: location.coordinates.coordinates[1]
      } : null)
    };
  }


}
