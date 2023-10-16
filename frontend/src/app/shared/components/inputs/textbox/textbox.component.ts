import {
  Component,
  EventEmitter,
  Input,
  Optional,
  Output,
} from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { ControlContainerFactory } from 'src/app/shared/dto/control-container-factory.function';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: ControlContainerFactory,
      deps: [[new Optional(), NgForm]],
    },
  ],
})
export class TextboxComponent {
  @Input() cssClass = 'p-inputtext';

  // name = 'name';

  @Input() placeholder = '';

  @Input() disabled = false;

  @Input() type = 'text';

  @Input() maxlength = '';

  @Input() id = uuid();

  @Input() max!: number;
  @Input() min!: number;

  @Input() controlModel: any;

  @Input() isReadOnly = false;

  @Input() floatedPlaceholder = '';

  @Input() validateControl = false;

  @Input() validateEmail = false;

  @Output() controlModelChange = new EventEmitter<any>();
  @Output() focusOut = new EventEmitter<any>();

  genericId = uuid();

  onModelChange(value: any) {
    if (this.controlModel) {
      this.controlModel = value;
    }


    this.controlModelChange.emit(value);
  }
}
