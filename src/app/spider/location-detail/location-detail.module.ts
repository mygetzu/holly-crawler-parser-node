import { Module, HttpModule } from '@nestjs/common';
import { LocationDetailService } from './location-detail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationDetail } from './location-detail.entity';
import { LocationService } from '../location/location.service';
import { ApiService } from '../api/api.service';
import { Location } from '../location/location.entity';

@Module({
  providers: [LocationDetailService, ApiService, LocationService],
  exports: [LocationDetailService, ApiService, LocationService],
  imports: [
    HttpModule.register({
      timeout: 18000,
      maxRedirects: 5,
    }),
    TypeOrmModule.forFeature([LocationDetail, Location]),
  ],
})
export class LocationDetailModule {}
