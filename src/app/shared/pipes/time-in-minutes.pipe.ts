import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'timeInMinutes'
})
export class TimeInMinutesPipe implements PipeTransform {

  constructor(
    private translateService: TranslateService,
  ) { }

  transform(minutes: number): Observable<string> {
    const hoursTranslation$ = this.translateService.get('DURATION.HOURS');
    const minutesTranslation$ = this.translateService.get('DURATION.MINUTES');

    return combineLatest(
      hoursTranslation$,
      minutesTranslation$,
    ).pipe(
      map(([hoursTranslation, minutesTranslation]) => {
        const hours = (minutes / 60);
        const hoursToDisplay = Math.floor(hours);
        const minutesToDisplay = minutes - hoursToDisplay * 60;
        const timeUnits = [];

        if (hoursToDisplay > 0) {
          timeUnits.push(`${hoursToDisplay}${hoursTranslation}`);
        }
        if (minutesToDisplay > 0) {
          timeUnits.push(`${minutesToDisplay} ${minutesTranslation}`);
        }

        return timeUnits.join(' ');
      })
    );
  }
}
