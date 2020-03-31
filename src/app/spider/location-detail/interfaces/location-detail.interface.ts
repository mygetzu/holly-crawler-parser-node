import { ObjectID } from 'typeorm';

export interface ILocationDetail {
  readonly _id: ObjectID;

  readonly name: string;
  readonly location_id: string;
  readonly latitude: string;
  readonly longitude: string;
  readonly timezone: string;
  readonly location_string: string;
}
