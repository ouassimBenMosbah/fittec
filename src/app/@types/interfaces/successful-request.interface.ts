export interface SuccessfulRequest<T> {
  status: 'success';
  data: T;
  message: string | null;
}
