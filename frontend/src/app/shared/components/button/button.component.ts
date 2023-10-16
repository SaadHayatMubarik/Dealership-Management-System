import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() icon = '';

  name = 'namme';

  @Input() look = '';

  @Input() iconClass = '';

  @Input() btnClass = '';

  @Input() styleClass = '';

  @Input() primary = false;

  @Input() disabled = false;

  @Input() id = uuid();

  @Input() tooltip = '';

  @Input() hideDelay: any;

  @Input() label: any ;

  @Output() onclick = new EventEmitter();

  onClick(): void {
    this.onclick.emit();
  }

}
