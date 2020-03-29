import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomConfigService {
  static get hotelCronMinute(): string {
    return process.env.HOTEL_CRON_MINUTE;
  }
  static get hotelCronHour(): string {
    return process.env.HOTEL_CRON_HOUR;
  }
  static get hotelCronDay(): string {
    return process.env.HOTEL_CRON_DAY;
  }
  static get hotelCronMonth(): string {
    return process.env.HOTEL_CRON_MONTH;
  }
  static get hotelCronWeek(): string {
    return process.env.HOTEL_CRON_WEEK;
  }

  static get reviewCronMinute(): string {
    return process.env.REVIEW_CRON_MINUTE;
  }
  static get reviewCronHour(): string {
    return process.env.REVIEW_CRON_HOUR;
  }
  static get reviewCronDay(): string {
    return process.env.REVIEW_CRON_DAY;
  }
  static get reviewCronMonth(): string {
    return process.env.REVIEW_CRON_MONTH;
  }
  static get reviewCronWeek(): string {
    return process.env.REVIEW_CRON_WEEK;
  }
}
