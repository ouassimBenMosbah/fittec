import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventTitleFormatter,
  CalendarView,
  DAYS_OF_WEEK
} from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/api/api.service';
import { WorkoutLesson } from '../../../../@types/interfaces/workout-lesson.interface';
import { CustomDateFormatter } from '../../../../providers/custom-date-formatter/custom-date-formatter.service';
import { CustomEventTitleFormatter } from '../../../../providers/custom-event-title-formatter/custom-event-title-formatter.service';

@Component({
  selector: 'app-bookings-calendar-container',
  templateUrl: './bookings-calendar-container.component.html',
  styleUrls: ['./bookings-calendar-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter
    },
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class BookingsCalendarContainerComponent implements OnInit {
  public view: CalendarView = CalendarView.Month;

  public viewDate: Date = new Date();

  public events$:
    | Observable<CalendarEvent<{ workoutLesson: WorkoutLesson }>[]>
    | undefined;

  public activeDayIsOpen: boolean = false;

  public weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  constructor(private api: ApiService) {}

  public ngOnInit(): void {
    this.events$ = this.fetchEvents();
  }

  public dayClicked({
    date,
    events
  }: {
    date: Date;
    events: CalendarEvent<{ workoutLesson: WorkoutLesson }>[];
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  public fetchEvents(): Observable<
    CalendarEvent<{ workoutLesson: WorkoutLesson }>[]
  > {
    return this.api.fetchUserBookings().pipe(
      map((bookings: WorkoutLesson[]) => {
        return (bookings ?? []).map((booking) =>
          this.formatToCalendar(booking)
        );
      })
    );
  }

  private formatToCalendar(
    booking: WorkoutLesson
  ): CalendarEvent<{ workoutLesson: WorkoutLesson }> {
    return {
      id: new Date(booking.date).getTime(),
      title: booking.groupe,
      start: new Date(booking.date)
    };
  }
}
