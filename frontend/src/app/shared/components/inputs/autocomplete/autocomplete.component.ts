import { Component, EventEmitter, Input, Output } from '@angular/core';

interface IOption {
  label?: string | null | undefined;
  value?: string | number | null | undefined;
}
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent {
  @Input() filteredData: IOption[] = [];

  @Input() value = '';

  @Input() showClear = false;

  @Input()
  model!: any;

  @Input() cssClass = '';

  @Input() style: any;

  @Input() field = 'label';

  @Input() multiple = false;

  @Input() dropdown = false;

  @Input() placeholder = '';

  @Input() validateControl = false;

  @Output() modelChange = new EventEmitter<any>();

  @Output() filterChange = new EventEmitter<any>();

  valueChange(): void {
    this.modelChange.emit(this.model);
  }

  completeMethod(event: any) {
    this.filterChange.emit(event);
  }
}
