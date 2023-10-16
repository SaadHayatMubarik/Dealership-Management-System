import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { ControlContainerFactory } from 'src/app/shared/dto/control-container-factory.function';
import { IObject } from 'src/app/shared/interfaces/common';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: ControlContainerFactory,
      deps: [[new Optional(), NgForm]],
    },
  ],
})
export class CheckboxComponent {
  @ViewChild('checkbox') checkbox: any;
  @Input()
  cssClass!: string;

  @Input() controlModel: any;
  @Input() value: any;

  @Input() name = 'name';

  @Input() id = uuid();

  @Input() shouldIncludeLabel = true;

  @Input() disabled = false;

  @Input() label = '';

  @Input() validateControl = false;

  @Output() controlModelChange = new EventEmitter<any>();

  @Input() isBinary = true;

  @Input() trueValue: any = 1;

  @Input() falseValue: any = 1;

  valueChange(value: { checked: boolean | number | IObject }): void {
    this.controlModel = value.checked;
    this.controlModelChange.emit(this.controlModel);
  }
}
