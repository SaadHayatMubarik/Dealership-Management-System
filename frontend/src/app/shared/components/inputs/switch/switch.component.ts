import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-switch-control',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent {
  @Input() checked = false;

  @Output() checkedChanged: EventEmitter<any> = new EventEmitter();

  @Input() cssClass = '';

  @Input() controlModel: any = false;

  @Input() id = uuid();

  @Input() validateControl = false;

  @Output() controlModelChange = new EventEmitter<any>();

  @Input() onLabel = ' ';

  @Input() offLabel = ' ';

  @Input() isEditAllowed = true;

  valueChange(value: any): void {
    this.checkedChanged.emit(value.checked);
  }
}
