import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventTitleFormatter,
  CalendarView,
  DAYS_OF_WEEK
} from 'angular-calendar';
import { add, format, setHours, setMinutes, startOfWeek } from 'date-fns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScheduleDayEvent } from 'src/app/@types/interfaces/schedule-day.interface';
import { ApiService } from 'src/app/api/api.service';
import { CustomDateFormatter } from '../../../../providers/custom-date-formatter/custom-date-formatter.service';
import { CustomEventTitleFormatter } from '../../../../providers/custom-event-title-formatter/custom-event-title-formatter.service';
import { FetchScheduleDataHelperService } from '../../services/fetch-schedule-data-helper/fetch-schedule-data-helper.service';

@Component({
  selector: 'app-calendar-container',
  templateUrl: './calendar-container.component.html',
  styleUrls: ['./calendar-container.component.scss'],
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
export class CalendarContainerComponent implements OnInit {
  public view: CalendarView = CalendarView.Week;

  public viewDate: Date = new Date();

  public events$: Observable<CalendarEvent<ScheduleDayEvent>[]> | undefined;

  public weekStartsOn: DAYS_OF_WEEK = DAYS_OF_WEEK.MONDAY;

  public activeDayIsOpen: boolean = false;

  public readonly numberDaysDisplayed = 6;

  public readonly excludeDays: number[] = [0]; // 0 = Sunday, 1 = Monday

  private innerWidth?: number;

  constructor(
    private fetchScheduleDataHelperService: FetchScheduleDataHelperService,
    private apiService: ApiService
  ) {}

  public ngOnInit(): void {
    this.events$ = this.fetchEvents(
      this.getStartOfWeek(this.viewDate),
      this.numberDaysDisplayed
    );
  }

  public onViewDateChange(): void {
    this.events$ = this.fetchEvents(
      this.getStartOfWeek(this.viewDate),
      this.numberDaysDisplayed
    );
  }

  public onEventClicked({ event }: { event: CalendarEvent }): void {
    const confirmation = confirm(
      `Est-tu sûr de vouloir réserver à  ${format(
        event.start,
        'HH:mm-dd/MM/yyyy'
      )}`
    );
    if (confirmation) {
      if (!event.id || typeof event.id !== 'string') {
        alert(`Une erreur s'est produite, veuillez actualiser la page`);
        return;
      }
      this.apiService
        .bookLesson({
          date: format(event.start, 'yyyy-MM-dd HH:mm:ss'),
          machine: event.id
        })
        .subscribe(
          (res) => {
            alert('La réservation a été effectué avec succès');
            this.fetchEvents(
              this.getStartOfWeek(this.viewDate),
              this.numberDaysDisplayed
            );
          },
          (err) => {
            alert(err);
          }
        );
    }
  }

  public fetchEvents(
    startOfWeek: Date,
    numberDaysDisplayed: number
  ): Observable<CalendarEvent<ScheduleDayEvent>[]> {
    return this.fetchScheduleDataHelperService
      .fetchEventsForDisplayedDays(startOfWeek, numberDaysDisplayed)
      .pipe(
        map((scheduleDayEvent: ScheduleDayEvent[]) => {
          this.innerWidth = window.innerWidth;
          return (scheduleDayEvent ?? []).map((event) =>
            this.formatToCalendar(event)
          );
        })
      );
  }

  private getStartOfWeek(viewDate: Date): Date {
    return startOfWeek(viewDate, { weekStartsOn: this.weekStartsOn });
  }

  private formatToCalendar(
    event: ScheduleDayEvent
  ): CalendarEvent<ScheduleDayEvent> {
    const [year, month, day] = event.day?.split('-') ?? [];
    const [hour, minute] = event.hour.split(':');
    const [durationHour, durationMinute] = event.duration.split(':');
    const start = setMinutes(
      setHours(new Date(+year, +month - 1, +day), +hour),
      +minute
    );
    const end = add(start, { hours: +durationHour, minutes: +durationMinute });
    const available = event.max - event.booking;
    return {
      id: event.uid,
      title:
        innerWidth > 900
          ? `${hour}:${minute} - ${available} disponibilité${
              available > 1 ? 's' : ''
            }`
          : `${available} disp.`,
      start,
      end,
      meta: event,
      cssClass: available === 1 ? 'book-quickly' : 'book-available'
    };
  }
}
