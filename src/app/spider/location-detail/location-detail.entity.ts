import { ObjectIdColumn, Column, Entity, ObjectID, OneToMany } from 'typeorm';
import { ILocationDetail } from './interfaces/location-detail.interface';
import { Hotel } from '../hotel/hotel.entity';

@Entity({ name: 'location_detail' })
export class LocationDetail implements ILocationDetail {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  location_id: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  timezone: string;

  @Column()
  location_string: string;
}
