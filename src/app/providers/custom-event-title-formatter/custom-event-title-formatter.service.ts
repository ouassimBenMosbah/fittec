import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { CalendarEvent, CalendarEventTitleFormatter } from 'angular-calendar';

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
  }

  public month(event: CalendarEvent): string {
    return `<b>${formatDate(event.start, 'HH:mm', this.locale)}</b> - ${
      event.title
    }`;
  }
}
