export enum WorkoutType {
  ems = 's',
  ems2 = 'e',
  ultrasonsOrCryotherapy = 'm'
}

export enum WorkoutMType {
  mType = 'm'
}

export type RoomId = 'EMS 1' | 'EMS 2' | 'Ultrasons' | 'Cryothérapie' | 'YOGA';

export type RoomLabel =
  | 'EMS'
  | 'EMS 2ème salle'
  | 'Ultrasons'
  | 'Cryothérapie'
  | 'YOGA';
