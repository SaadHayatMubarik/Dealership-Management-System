import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IOption } from 'src/app/shared/interfaces/common';

@Component({
  selector: 'app-radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.scss'],
})
export class RadiobuttonComponent {
  @Input() controlModel: any;

  @Output() controlModelChange = new EventEmitter<any>();

  @Input() name = '';

  @Input() disabled = false;

  @Input() values: IOption[] = [];

}
