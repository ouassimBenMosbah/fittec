import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-bookings-calendar-header',
  templateUrl: './bookings-calendar-header.component.html',
  styleUrls: ['./bookings-calendar-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingsCalendarHeaderComponent {
  @Input() view!: CalendarView;

  @Input() viewDate!: Date;

  @Input() locale: string = 'fr';

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;
}
