import { Component, Input, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';

import { SelectOption } from 'src/app/core/entities';

@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelectDropdownComponent),
    multi: true
  }]
})
export class MultiSelectDropdownComponent implements ControlValueAccessor {
  @ViewChild('filterInput', { static: false }) filterInputElRef: ElementRef;

  @Input() options: SelectOption[];
  @Input() selectedOptions: SelectOption[] = [];
  @Input() placeholder?: string;
  @Input() invalid?: boolean;

  private filterText: string;

  getAvailableOptions(): any[] {
    return this.options
      ? this.options.filter(option => !this.isSelected(option) && this.isFilterTextMatch(option))
      : [];
  }

  getFilterInputPlaceholder() {
    return this.placeholder && !this.selectedOptions.length ? this.placeholder : '';
  }

  onFilterInput(event) {
    this.filterText = event.target.value;
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedLabel = event.option.viewValue;
    const selectedOption = this.getOption(selectedLabel);

    this.selectedOptions.push(selectedOption);
    this.propagateChange(this.selectedOptions);
    this.filterText = null;
    this.filterInputElRef.nativeElement.blur();
  }

  onOptionDeselected(index: number) {
    this.selectedOptions.splice(index, 1);
    this.propagateChange(this.selectedOptions);
  }

  writeValue(options: SelectOption[]) {
    this.selectedOptions = options;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

  private propagateChange = (_: SelectOption[]) => { };

  private getOption(label: string): any {
    return this.options.find(option => option.label === label);
  }

  private isSelected(option: SelectOption): boolean {
    return this.selectedOptions.some(selectedOption => selectedOption.id === option.id);
  }

  private isFilterTextMatch(option: SelectOption): boolean {
    if (!this.filterText) { return true; }

    return option.label.toLowerCase().includes(this.filterText.toLowerCase());
  }
}
