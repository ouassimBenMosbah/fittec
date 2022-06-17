import { Injectable } from '@angular/core';
import { add, format, isAfter, setHours, setMinutes } from 'date-fns';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScheduleDayEvent } from 'src/app/@types/interfaces/schedule-day.interface';
import { ApiService } from 'src/app/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class FetchScheduleDataHelperService {
  constructor(private apiService: ApiService) {}

  public fetchEventsForDisplayedDays(
    start: Date,
    numberDaysDisplayed: number
  ): Observable<ScheduleDayEvent[]> {
    const dates = this.getDates(start, numberDaysDisplayed);
    return forkJoin(
      dates.map((date) => this.apiService.fetchCalendarForDay(date))
    ).pipe(
      map((events) =>
        events.reduce(
          (acc, curr, index) =>
            acc.concat(
              this.filterNonBookableEvents(curr, dates[index]).map((c) => ({
                ...c,
                day: dates[index]
              }))
            ),
          []
        )
      )
    );
  }

  private filterNonBookableEvents(
    events: ScheduleDayEvent[],
    eventDay: string
  ): ScheduleDayEvent[] {
    const [year, month, day] = eventDay?.split('-') ?? [];
    return events.filter((event) => {
      if (event.booking === event.max) {
        return false;
      }
      const [hour, minute] = event.hour.split(':');
      const [durationHour, durationMinute] = event.duration.split(':');
      const start = setMinutes(
        setHours(new Date(+year, +month - 1, +day), +hour),
        +minute
      );
      const end = add(start, {
        hours: +durationHour,
        minutes: +durationMinute
      });
      return isAfter(end, new Date());
    });
  }

  private getDates(start: Date, numberDaysDisplayed: number): string[] {
    return Array(numberDaysDisplayed)
      .fill(null)
      .map((_, index) => format(add(start, { days: index }), 'yyyy-MM-dd'));
  }
}
