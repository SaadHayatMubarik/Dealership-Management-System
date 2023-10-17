import { Injectable } from '@angular/core';
import { IToaster } from '../interfaces/common';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

   private loaderState = new BehaviorSubject<boolean>(false);

  loaderState$ = this.loaderState.asObservable();

  showLoader() {
    this.loaderState.next(true);
  }

  hideLoader() {
    this.loaderState.next(false);
  }

  constructor(private messageService: MessageService) {}

  
  

  showError(message: string= 'Server error! Please contract system administrator', summary = 'Error', life = 2500) {
    this.messageService.add({
      detail: message,
      summary,
      severity: 'error'
    });
  }

  showSuccess(message: string, summary = 'Success', life = 2500) {
    this.messageService.add({
      detail:message,
      summary,
      severity: 'success'
    });
  }

  showInfo(message: string, summary = 'Information', life = 2500) {
    this.messageService.add({
      detail :message,
      summary,
      severity: 'info'
    });
  }

  showWarning(message: string, summary = 'Warning', life = 2500) {
    this.messageService.add({
      detail: message,
      summary,
      severity: 'warn'
    });
  }
}
