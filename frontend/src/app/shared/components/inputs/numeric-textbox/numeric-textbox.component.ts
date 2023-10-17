import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { ControlContainerFactory } from 'src/app/shared/dto/control-container-factory.function';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-numeric-textbox',
  templateUrl: './numeric-textbox.component.html',
  styleUrls: ['./numeric-textbox.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: ControlContainerFactory,
      deps: [[new Optional(), NgForm]],
    },
  ],
})
export class NumericTextboxComponent {
  @Input() cssClass = '';

  @Input() styleClass = '';

  @Input() inputStyleClass = '';

  @Input() placeholder = '';

  @Input() disabled = false;

  @Input() id = uuid();

  @Input() controlModel: any;

  @Input() isReadOnly = false;

  @Input() validateControl = false;

  @Output() controlModelChange = new EventEmitter<any>();

  @Input()
  format!: boolean;

  @Input() step = 0;

  @Input() max!: number;
  @Input() min!: number;

  @Input()
  decimals!: number;

  @Input() spinners = false;

  @Input() useGrouping = false;

  onModelChange(value: any): void {
    if (this.controlModel) {
      this.controlModel = value;
    }
    this.controlModelChange.emit(value);
  }
  onInputChange(value: any): void {
    if (value) {
      this.controlModel = value;
    }
    this.controlModelChange.emit(value);
  }
}
