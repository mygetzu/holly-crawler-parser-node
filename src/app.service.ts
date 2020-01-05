import { Injectable } from '@nestjs/common';
import { NestSchedule, Cron } from 'nest-schedule';
import { LocationService } from './app/spider/location/location.service';
import { HotelService } from './app/spider/hotel/hotel.service';
import { async } from 'rxjs/internal/scheduler/async';
import { KafkaService } from './app/services/kafka/kafka.service';

@Injectable()
export class AppService extends NestSchedule {
  constructor(
    private readonly locationService: LocationService,
    private readonly hotelService: HotelService,
    private readonly kafkaService: KafkaService,
  ) {
    super();
  }
  @Cron('0 50 0 * * *', {
    startTime: new Date(),
    endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  })
  async crawlReview() {
    // await KafkaService.connect();
    console.log('=============== Starting Cron Job ===============');
    const locs = await this.locationService.findAll();

    let i = 0;
    const waitFor = ms => new Promise(r => setTimeout(r, ms));
    const asyncForEach = async (index, array, callback) => {
      for (index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    };

    const start = async () => {
      await asyncForEach(i, locs, async loc => {
        await waitFor(1);

        await this.hotelService.getHotelSaveReview(loc);
      });
    };
    start();
  }

  @Cron('0 10 23 * * *', {
    startTime: new Date(),
    endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  })
  async crawlHotel() {
    console.log('=============== Start Crawling Hotel List ===============');
    const locs = await this.locationService.findAll();

    let i = 0;
    const waitFor = ms => new Promise(r => setTimeout(r, ms));
    const asyncForEach = async (index, array, callback) => {
      for (index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    };

    const saveHotels = async () => {
      await asyncForEach(i, locs, async loc => {
        await waitFor(1);

        await this.hotelService.createManyWithoutReview(loc);
      });
    };
    saveHotels();
  }
}
