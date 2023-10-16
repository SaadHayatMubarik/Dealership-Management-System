import {
  Component,
  EventEmitter,
  Input, Output,
  ViewChild
} from '@angular/core';
import { IOption } from 'src/app/shared/interfaces/common';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss'],
})
export class MultiselectComponent {
  private _options: IOption[] = [];

  data: any = [];

  @Input() optionLabel = 'label';

  @Input() optionValue = 'value';

  @Input()
  set options(value: IOption[]) {
    if (value) {
      this._options = value;
      this.data = value.slice();
    }
  }

  get options() {
    return this._options;
  }

  @Input() value?: string;

  @Output() selectedChange = new EventEmitter();

  @Input() cssClass = '';

  @Input() placeholder = '';

  @Input() toggleAll = true;

  @Input() disabled = false;

  @Input() id = uuid();

  @Input() controlModel: any;

  @Input() isReadOnly = false;

  @Input() validateControl = false;

  @Output() controlModelChange = new EventEmitter<any>();

  @ViewChild('list') list: any;

  onControlModelChange(value: any) {
    if (this.controlModel) {
      this.controlModel = value.value;
    }

    this.controlModelChange.emit(value.value);
  }
}
