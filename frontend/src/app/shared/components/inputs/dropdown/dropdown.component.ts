import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IOption } from 'src/app/shared/interfaces/common';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  // private _options: Array<IOption> | Array<string> | GroupResult[];

  @Input() filteredData: IOption[] | any[] = [];

  @Input() value = '';

  @Input() showClear = false;

  @Input()
  controlModel!: any;

  @Input() cssClass = '';

  @Input() style: any;

  @Input() optionLabel = 'label';

  @Input() optionValue = 'value';

  @Input() filter = true;

  @Input() minFilterLength = 2;

  @Input() lazy = false;

  @Input() placeholder = '--select--';

  @Input() validateControl = false;

  @Input() disabled = false;

  @Input() appendTo: string | null = null;

  @Output() controlModelChange = new EventEmitter<any>();
  @Output() filterInvoked = new EventEmitter<any>();

  @ViewChild('dropdownElement') dropdownElement!: any;

  valueChange(value: any): void {
    this.controlModel = value;
    this.controlModelChange.emit(this.controlModel);
  }

  filterMethod(event: any) {
    if(this.filter && (event?.filter?.length || 0) > this.minFilterLength ) {
      this.filterInvoked.emit(event.filter)
    }
  }

  getFilterValue() {
    return this.dropdownElement?.['filterValue']
  }
}
