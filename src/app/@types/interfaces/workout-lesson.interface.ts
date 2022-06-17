import { RoomId, RoomLabel, WorkoutMType, WorkoutType } from './shared.type';
import { SuccessfulRequest } from './successful-request.interface';

export interface WorkoutLesson {
  uid: string;
  type: WorkoutType;
  mtype: WorkoutMType;
  date: Date;
  map: number;
  credit: 1;
  venu: number;
  bilan: 0 | 1;
  name: RoomId;
  info: string | null;
  color: string;
  machine: string;
  groupe: RoomLabel;
}

export type SuccessfulWorkoutLessonRequest = SuccessfulRequest<WorkoutLesson[]>;
