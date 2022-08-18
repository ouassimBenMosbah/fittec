import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { exhaustMap, map, tap } from 'rxjs/operators';
import {
  LoginData,
  LoginSuccessRequest
} from '../@types/interfaces/login-data.interface';
import {
  ScheduleDayEvent,
  SuccessfulScheduleDayRequest
} from '../@types/interfaces/schedule-day.interface';
import { SuccessfulRequest } from '../@types/interfaces/successful-request.interface';
import {
  SuccessfulWorkoutLessonRequest,
  WorkoutLesson
} from '../@types/interfaces/workout-lesson.interface';
import { AuthenticationService } from '../modules/authentication/services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly scheme = 'https://';
  private readonly host = 'api.studioconnect.fr';
  private readonly serverId = '226b44ba-3449-4713-bcff-f62238d79c98';
  private readonly baseUrl = `${this.scheme}${this.host}/${this.serverId}`;

  constructor(
    private httpServer: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  public getToken(params: {
    phone: string;
    password: string;
  }): Observable<LoginData> {
    return this.httpServer
      .post<LoginSuccessRequest>(`${this.baseUrl}/auth/phone`, {
        phone: params.phone,
        password: params.password,
        terminal: 'WEB'
      })
      .pipe(
        exhaustMap((res) => {
          if (res.status !== 'success') {
            return throwError(new Error(res.message ?? 'Erreur'));
          }
          return of(this.getDataFromSuccessfulRequest(res));
        }),
        tap((data) => {
          this.authenticationService.setTokenInLocalStorage(data);
        })
      );
  }

  public fetchUserBookings(): Observable<WorkoutLesson[]> {
    return this.httpServer
      .get<SuccessfulWorkoutLessonRequest>(`${this.baseUrl}/user/booking`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.authenticationService.token}`
        })
      })
      .pipe(map(this.getDataFromSuccessfulRequest));
  }

  /**
   * @param date is a date converted to a string formatted to YYYY-MM-DD format
   */
  public fetchCalendarForDay(date: string): Observable<ScheduleDayEvent[]> {
    return this.httpServer
      .get<SuccessfulScheduleDayRequest>(
        `${this.baseUrl}/public/booking/${date}`
      )
      .pipe(map(this.getDataFromSuccessfulRequest), map(this.filterEMSLessons));
  }

  public bookLesson(params: {
    date: string;
    machine: string;
  }): Observable<{ status: string; data: unknown; message: string }> {
    return this.httpServer
      .post<{ status: string; data: unknown; message: string }>(
        `${this.baseUrl}/user/booking`,
        {
          ...params,
          map: 0
        }
        // {
        //   date: '2022-07-30 13:30:00',
        //   machine: '9db95873-c712-43b2-8cc8-7e1308bb682f',
        //   map: 0
        // }
      )
      .pipe(
        exhaustMap((res) => {
          if (res.status !== 'success') {
            return throwError(new Error(res.message ?? 'Erreur'));
          }
          return of(res);
        })
      );
  }

  public deleteBooking(uid: string): Observable<SuccessfulRequest<null>> {
    return this.httpServer.delete<SuccessfulRequest<null>>(
      `${this.baseUrl}/user/booking`,
      { params: { uid } }
    );
  }

  private getDataFromSuccessfulRequest<T>(
    requestResponse: SuccessfulRequest<T>
  ): T {
    return requestResponse.data;
  }

  private filterEMSLessons(events: ScheduleDayEvent[]): ScheduleDayEvent[] {
    return events.filter(({ name }) => name === 'EMS 1' || name === 'EMS 2');
  }
}
