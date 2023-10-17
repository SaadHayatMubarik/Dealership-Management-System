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
import { IObject, ISelectData } from 'src/app/shared/interfaces/common';
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: ControlContainerFactory,
      deps: [[new Optional(), NgForm]],
    },
  ],
})
export class SelectComponent {
  @Input() class = '';

  @Input()
  controlModel!: any;

  @Input() validateControl = false;

  @Input() isDisabled = false;

  @Input() id = '';

  @Input() isSetValue = false;

  @Input() data: ISelectData[] = [];

  @Input() showDefaultOption = true;

  @Input() defaultOptionLabel = '';

  @Output() whenChange = new EventEmitter<string | IObject | number>();

  @Output() controlModelChange = new EventEmitter<any>();

  get selectedData(): string | IObject | number | null {
    return this.controlModel ? this.controlModel : null;
  }

  onModelChange(value: string | IObject | number): void {
    this.controlModel = value;
    this.controlModelChange.emit(this.controlModel);
  }

  changed($event: any) {
    this.whenChange.emit($event.target.value);
  }
}
