import { Injectable, HttpService } from '@nestjs/common';
import { IHotel } from '../hotel/interfaces/hotel.interface';
import {
  URL_HOTELS_BY_LOCATION,
  HEADER_TRIPADVISOR_API_REQ,
} from '../../utils/constants';
import { IResponseHotel } from './interfaces/response-hotel.interface';
import { IReview } from '../review/interfaces/review.interface';
import { Location } from '../location/location.entity';
import { Hotel } from '../hotel/hotel.entity';
import { ILocationDetail } from '../location-detail/interfaces/location-detail.interface';
import { IResponseLocationDetail } from './interfaces/response-location-detail.interface';

@Injectable()
export class ApiService {
  constructor(private readonly http: HttpService) {}

  async grabDetailLocation(
    url: string,
    loc: Location,
  ): Promise<ILocationDetail> {
    try {
      const location_details = await this.http
        .get<IResponseLocationDetail<ILocationDetail>>(url, {
          headers: HEADER_TRIPADVISOR_API_REQ,
        })
        .toPromise();
      return location_details.data.data[0].result_object;
    } catch (error) {
      console.log('Failed to retrieve detail location : ' + loc.name);
    }
  }

  async grabHotelByLocation(
    url: string,
    loc: Location,
  ): Promise<IResponseHotel<IHotel>> {
    try {
      const hotels = await this.http
        .get<IResponseHotel<IHotel>>(url, {
          headers: HEADER_TRIPADVISOR_API_REQ,
        })
        .toPromise();
      return hotels.data;
    } catch (error) {
      console.log('Failed to retrieve data hotel from location : ' + loc.name);
    }
  }

  async grabReviewByHotelLocationId(
    url: string,
    hotel: Hotel,
  ): Promise<IResponseHotel<IReview>> {
    try {
      const reviews = await this.http
        .get<IResponseHotel<IReview>>(url, {
          headers: HEADER_TRIPADVISOR_API_REQ,
        })
        .toPromise();
      return reviews.data;
    } catch (error) {
      console.log(
        'Failed to retrieve data review from hotel (location) : ' + hotel.name,
      );
      console.log(error + '\n');
    }
  }
}
