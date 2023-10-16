import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent {
  @Input() autoSize = false;

  @Input() rows = 1;

  @Input() disabled = false;

  @Input() cssClass = '';

  @Input() placeholder = '';

  @Input() controlModel: any;

  @Input() isReadOnly = false;

  @Output() controlModelChange = new EventEmitter<any>();
}
