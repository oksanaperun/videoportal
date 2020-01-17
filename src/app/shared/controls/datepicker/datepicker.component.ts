import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { LanguageService } from 'src/app/core/services/language.service';

export const DATE_FORMATS = {
  parse: {
    dateInput: 'D MMM, YYYY',
  },
  display: {
    dateInput: 'D MMM, YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
  ],
})
export class DatepickerComponent implements ControlValueAccessor {
  @Input() placeholder?: string;
  @Input() invalid?: string;

  value: Date;

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private languageService: LanguageService,
  ) {
    this.setLocale();
  }

  onInput(event) {
    this.propagateChange(event.value ? event.value.valueOf() : null);
  }

  writeValue(milliseconds: number) {
    if (milliseconds) {
      this.value = new Date(milliseconds);
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

  private propagateChange = (_: Date) => { };

  private setLocale() {
    const language = this.languageService.getLanguage();

    this.dateAdapter.setLocale(language);
  }
}
