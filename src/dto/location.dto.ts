import { LatLngDto } from './lat-lng.dto';

export class LocationDto {
  id: string;
  country: string;
  coordinate: LatLngDto;
  address1: string;
  address2: string;
  images: string[];
}
