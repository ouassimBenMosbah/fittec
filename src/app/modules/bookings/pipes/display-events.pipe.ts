import { Pipe, PipeTransform } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { WorkoutLesson } from '../../../@types/interfaces/workout-lesson.interface';
import { format } from 'date-fns';

@Pipe({
  name: 'displayEvents'
})
export class DisplayEventsPipe implements PipeTransform {
  transform(events: CalendarEvent<{ workoutLesson: WorkoutLesson }>[]): string {
    return events
      .map((e) => {
        return `${format(e.start, 'HH:mm')} - ${e.title}`;
      })
      .join('<br/>');
  }
}
