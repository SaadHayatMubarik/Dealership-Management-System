import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-control',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  
  isDialogInitialized = false;

  canInitializeDialogContent = false;

  @Input() title = '';

  @Input() draggable = false;

  @Input() modal = true;

  @Input() showHeader = true;

  @Input() isShowFooter = true;

  @Input() okButtonLabel = 'Save';

  @Input() height?: number | string;

  @Input() width?: number | string;

  @Input() hideCancelButton = false;

  @Input() hideOkButton = false;

  @Input() dismissableMask = false;

  @Input() actionsLayout = 'normal';

  @Input() dialogAlign = 'center';

  dialogWidth = { width: '500px' };

  @Output() closed = new EventEmitter<void>();

  @Output() cancelled = new EventEmitter<void>();

  @Output() oked = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {
    
  }

  private async execute(action: () => any) {
    try {
      await action();
    } catch (e) {
      console.error(e);
    }
  }

  cancel(): void {
    this.close();
    this.cancelled.emit();
  }

  close(): void {
    this.isDialogInitialized = false;
    this.canInitializeDialogContent = false;
    this.closed.emit();
  }

  async ok(): Promise<void> {
    this.oked.emit();
    return Promise.resolve();
  }

}
