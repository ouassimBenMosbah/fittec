import { RoomId, RoomLabel, WorkoutMType } from './shared.type';
import { SuccessfulRequest } from './successful-request.interface';

export interface ScheduleDayEvent {
  uid: string;
  hour: string; // HH:mm
  duration: string; // HH:mm
  type: WorkoutMType;
  name: RoomId;
  info: string | null;
  color: string; // #000000
  max: number;
  map: number;
  groupe: RoomLabel;
  first_name: string | null;
  coach_uid?: string | null;
  booking: number; // number of available bookings
  day?: string;
}

export type SuccessfulScheduleDayRequest = SuccessfulRequest<
  ScheduleDayEvent[]
>;

// ScheduleDay example
// {
//   "uid": "9db95873-c712-43b2-8cc8-7e1308bb682f",
//   "hour": "11:00",
//   "duration": "00:30",
//   "type": "m",
//   "name": "EMS 1",
//   "info": "",
//   "color": "#000000",
//   "max": 2,
//   "map": 0,
//   "groupe": "EMS",
//   "first_name": "Sandra",
//   "coach_uid": "a5519dfb-bf16-4ff4-b371-3fec0e70b3a7",
//   "booking": 0
// }
