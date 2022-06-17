import { SuccessfulRequest } from './successful-request.interface';

export interface LoginData {
  token: string;
  refresh: string;
}

export type LoginSuccessRequest = SuccessfulRequest<LoginData>;
