import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(minutes: number): string {
    const hours = (minutes / 60);
    const hoursToDisplay = Math.floor(hours);
    const minutesToDisplay = minutes - hoursToDisplay * 60;
    const timeUnits = [];

    if (hoursToDisplay > 0) {
      timeUnits.push(`${hoursToDisplay}h`);
    }
    if (minutesToDisplay > 0) {
      timeUnits.push(`${minutesToDisplay} min`);
    }

    return timeUnits.join(' ');
  }

}
