import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingsCalendarContainerComponent } from './components/bookings-calendar-container/bookings-calendar-container.component';
import {
  CalendarModule as AngularCalendarModule,
  DateAdapter
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule } from '@angular/forms';
import { BookingsCalendarHeaderComponent } from './components/bookings-calendar-header/bookings-calendar-header.component';
import { MatButtonModule } from '@angular/material/button';
import { DisplayEventsPipe } from './pipes/display-events.pipe';

@NgModule({
  declarations: [
    BookingsCalendarContainerComponent,
    BookingsCalendarHeaderComponent,
    DisplayEventsPipe
  ],
  imports: [
    AngularCalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    CommonModule,
    FormsModule,
    MatButtonModule
  ],
  exports: [BookingsCalendarContainerComponent]
})
export class BookingsModule {}
