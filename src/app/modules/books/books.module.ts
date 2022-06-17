import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarContainerComponent } from './components/calendar-container/calendar-container.component';
import {
  CalendarModule as AngularCalendarModule,
  DateAdapter
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule } from '@angular/forms';
import { CalendarHeaderComponent } from './components/calendar-header/calendar-header.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CalendarContainerComponent, CalendarHeaderComponent],
  imports: [
    AngularCalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    CommonModule,
    FormsModule,
    MatButtonModule
  ],
  exports: [CalendarContainerComponent]
})
export class BooksModule {}
