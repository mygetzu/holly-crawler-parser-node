import {
  Controller,
  Post,
  Body,
  Get,
  HttpService,
  Res,
  Param,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { ApiService } from '../api/api.service';
import { URL_HOTELS_BY_LOCATION } from '../../utils/constants';
import { LocationService } from '../location/location.service';

@Controller('api/v1/spider/hotel')
export class HotelController {
  constructor(private readonly service: HotelService) {}

  @Post()
  async create(@Body() dto: CreateHotelDto) {
    this.service.create(dto);
  }

  @Get('/:id')
  async getHotelId(@Param('id') id: string) {
    const data = await this.service.getHotelByLocHotelID(id);
    return data;
  }

  @Get('/crawl')
  async crawlHotelByLocId(): Promise<any> {
    return this.service.crawlHotel();
  }
}
