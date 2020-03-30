import { Injectable } from '@nestjs/common';
import { NestSchedule, Cron } from 'nest-schedule';
import { LocationService } from './app/spider/location/location.service';
import { HotelService } from './app/spider/hotel/hotel.service';
import { async } from 'rxjs/internal/scheduler/async';
import { KafkaService } from './app/services/kafka/kafka.service';
import { CustomConfigService } from './app/config/custom-config/custom-config.service';

export const CronVariable = {
  HOTEL_CRON_MINUTE: '0',
  HOTEL_CRON_HOUR: '11',
  HOTEL_CRON_DAY: '30',

  REVIEW_CRON_MINUTE: '1',
  REVIEW_CRON_HOUR: '0',
  REVIEW_CRON_DAY: '1',
};

@Injectable()
export class AppService extends NestSchedule {
  constructor(
    private readonly locationService: LocationService,
    private readonly hotelService: HotelService,
    private readonly customConfigService: CustomConfigService,
    private readonly kafkaService: KafkaService,
  ) {
    super();
  }

  @Cron(
    '0 ' +
      CronVariable.HOTEL_CRON_MINUTE +
      ' ' +
      CronVariable.HOTEL_CRON_HOUR +
      ' ' +
      CronVariable.HOTEL_CRON_DAY +
      ' * *',
    {
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    },
  )
  async crawlHotel() {
    console.log('=============== Start Crawling Hotel List ===============');
    const locs = await this.locationService.findIndonesia();

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
        console.log(i++ + ' )');
        await this.hotelService.createManyWithoutReview(loc);
      });
    };
    await saveHotels();
  }

  @Cron(
    '0 ' +
      CronVariable.REVIEW_CRON_MINUTE +
      ' ' +
      CronVariable.REVIEW_CRON_HOUR +
      ' * * *',
    {
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    },
  )
  async crawlReview() {
    // await KafkaService.connect();
    console.log(
      '=============== Starting Crawling Review List ===============',
    );
    const locs = await this.locationService.findIndonesia();

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
    await start();
  }
}
