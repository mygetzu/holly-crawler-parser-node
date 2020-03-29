import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelModule } from './app/spider/hotel/hotel.module';
import { LocationModule } from './app/spider/location/location.module';
import { join } from 'path';
import { DatabaseModule } from './app/config/database/database.module';
import { ConfigModule, ConfigService } from 'nestjs-dotenv';
import { HotelService } from './app/spider/hotel/hotel.service';
import { LocationService } from './app/spider/location/location.service';
import { Location } from './app/spider/location/location.entity';
import { ScheduleModule } from 'nest-schedule';
import { ApiModule } from './app/spider/api/api.module';
import { ReviewModule } from './app/spider/review/review.module';
import { KafkaModule } from './app/services/kafka/kafka.module';
import { KafkaService } from './app/services/kafka/kafka.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'holly_test',
      entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    TypeOrmModule.forFeature([Location]),
    ScheduleModule.register(),
    HotelModule,
    LocationModule,
    DatabaseModule,
    ApiModule,
    ReviewModule,
    KafkaModule,
  ],
  controllers: [AppController],
  providers: [AppService, LocationService, KafkaService],
  exports: [LocationService],
})
export class AppModule {}
