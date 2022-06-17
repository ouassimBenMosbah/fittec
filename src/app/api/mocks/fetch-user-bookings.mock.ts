import { WorkoutLesson } from '../../@types/interfaces/workout-lesson.interface';
import { WorkoutMType, WorkoutType } from '../../@types/interfaces/shared.type';

export const userBookingsMock: WorkoutLesson[] = [
  {
    uid: 'af255172-5fa8-4a80-81a0-7673be9c6ce1',
    type: WorkoutType.ems,
    mtype: WorkoutMType.mType,
    date: new Date('2022-07-08T11:00:00.000Z'),
    map: 0,
    credit: 1 as const,
    venu: 1,
    bilan: 0 as const,
    name: 'EMS 1' as const,
    info: '',
    color: '#000000',
    machine: '9db95873-c712-43b2-8cc8-7e1308bb682f',
    groupe: 'EMS' as const
  },
  {
    uid: '73816e84-3377-4404-806d-575c9118f5ad',
    type: WorkoutType.ems,
    mtype: WorkoutMType.mType,
    date: new Date('2022-07-05T16:00:00.000Z'),
    map: 0,
    credit: 1 as const,
    venu: 1,
    bilan: 0 as const,
    name: 'EMS 1' as const,
    info: '',
    color: '#000000',
    machine: '9db95873-c712-43b2-8cc8-7e1308bb682f',
    groupe: 'EMS' as const
  },
  {
    uid: '3d693961-3e10-4463-852a-822c2a4aff66',
    type: WorkoutType.ems,
    mtype: WorkoutMType.mType,
    date: new Date('2022-06-28T11:00:00.000Z'),
    map: 0,
    credit: 1 as const,
    venu: 1,
    bilan: 0 as const,
    name: 'EMS 1' as const,
    info: '',
    color: '#000000',
    machine: '9db95873-c712-43b2-8cc8-7e1308bb682f',
    groupe: 'EMS' as const
  },
  {
    uid: '6c28855b-ee8b-4b77-b495-5b2336f2f85d',
    type: WorkoutType.ems,
    mtype: WorkoutMType.mType,
    date: new Date('2022-06-23T11:30:00.000Z'),
    map: 0,
    credit: 1 as const,
    venu: 1,
    bilan: 0 as const,
    name: 'EMS 1' as const,
    info: '',
    color: '#000000',
    machine: '9db95873-c712-43b2-8cc8-7e1308bb682f',
    groupe: 'EMS' as const
  },
  {
    uid: 'd2ee48dd-9fea-4c97-801b-9f37e95868a2',
    type: WorkoutType.ems2,
    mtype: WorkoutMType.mType,
    date: new Date('2022-06-15T17:30:00.000Z'),
    map: 0,
    credit: 1 as const,
    venu: 1,
    bilan: 0 as const,
    name: 'EMS 2' as const,
    info: null,
    color: '#000000',
    machine: 'e2e56ca7-6052-496b-902c-548c64871137',
    groupe: 'EMS 2ème salle' as const
  }
];
