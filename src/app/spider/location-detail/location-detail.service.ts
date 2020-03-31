import { Injectable, BadRequestException } from '@nestjs/common';
import { LocationDetail } from './location-detail.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ILocationDetail } from './interfaces/location-detail.interface';
import { URL_HOTELS_BY_LOCATION_DETAIL } from '../../utils/constants';
import { Location } from '../location/location.entity';
import { ApiService } from '../api/api.service';

@Injectable()
export class LocationDetailService {
  constructor(
    private readonly apiService: ApiService,
    @InjectRepository(LocationDetail)
    private readonly repo: Repository<LocationDetail>,
  ) {}

  async findAll(): Promise<LocationDetail[]> {
    const location_details = await this.repo.find({});
    if (!location_details) {
      throw new BadRequestException('Failed to get data location details !');
    }
    return location_details;
  }

  async isLocationDetailExist(loc_id: string) {
    try {
      const data = await this.repo.findOne({
        where: { location_id: loc_id },
      });

      if (data === undefined) return false;
      else return true;
    } catch (error) {
      throw new BadRequestException('Failed to get data location detail !');
    }
  }

  async create(dto: ILocationDetail): Promise<LocationDetail> {
    try {
      const save = await this.repo.save(dto);

      if (save) {
        console.log(
          '(Location Detail) [ ' +
            Date().toString() +
            ' ] Saved! Location ' +
            dto.location_id +
            ' - ' +
            dto.name,
        );
        return save;
      }
    } catch (error) {
      console.log('Err : Failed to save location detail : ' + dto.location_id);
      throw new BadRequestException('Failed to save data !');
    }
  }

  async createFromGrabbing(loc: Location): Promise<any> {
    const locationID = loc.location_id;
    let url = URL_HOTELS_BY_LOCATION_DETAIL + '&query=' + loc.name;

    try {
      let response = await this.apiService.grabDetailLocation(url, loc);
      const location_detail = response;

      let is_location_detail_exist = await this.isLocationDetailExist(
        location_detail.location_id,
      );
      let date_now: Date = new Date();

      if (!is_location_detail_exist) {
        const locationDetailCreate = {
          ...location_detail,
          created_at: date_now,
        };
        await this.create(locationDetailCreate);
      } else {
        console.log(
          '[ ' +
            Date.now() +
            ' ] Location Detail = ' +
            location_detail.name +
            ' is already exist !',
        );
      }
    } catch (error) {
      console.log(
        '[ ' + Date.now() + ' ] Failed to save location detail : ' + locationID,
      );
      console.log(error);
    }
  }
}
