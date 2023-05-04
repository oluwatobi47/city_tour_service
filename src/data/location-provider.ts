import { LocationDto } from '../dto/location/location.dto';

export interface LocationProvider {
  /**
   * Returns a list of locations matching a search criteria
   * @param query the search string for a location
   *
   * @returns A list of locations
   * */
  findLocations(query: string): Array<LocationDto>;

  getLocationsByCity(city_id: string): Array<LocationDto>;

}
