import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import * as moment from 'moment';
import { CalendarTypeView } from 'primeng/calendar';
import { v4 as uuid } from 'uuid';
@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {
  @Input() cssClass = '';

  @Input() appendTo = '';

  @Input() id = uuid();

  @Input() validateControl = false;

  @Input() disabled = false;

  @Input() selectionMode = 'single';

  @Input() controlModel: any;

  @Input() isStringDate = false;

  @Input() stringDate: any;

  @Input() view = 'date' as CalendarTypeView;
  
  @Input() showTime = false

  @Input() dateFormat = 'yy-mm-dd';

  @Input() placeholder = 'YYYY-MM-DD';
  
  @Input() minDate:any;

  @Input() maxDate:any;

  @Output() stringDateChange = new EventEmitter<any>();

  @Output() controlModelChange = new EventEmitter<any>();

  @ViewChild('datepicker') datepicker!: any;

  ngOnInit(): void {
    if (this.isStringDate && this.stringDate) {
      this.controlModel = moment(this.stringDate).toDate();
    }
  }

  dateChanged(): void {
    if (this.selectionMode === 'single') {
      this.stringDate = moment(this.controlModel).format(this.dateFormat);
      this.stringDateChange.emit(this.stringDate);
      this.controlModelChange.emit(this.controlModel);
    } else {
      this.controlModelChange.emit(this.controlModel);
    }
  }

  clear() {
    this.controlModel = null;
    this.datepicker.value = null;
    this.controlModelChange.emit(this.controlModel);
  }
}