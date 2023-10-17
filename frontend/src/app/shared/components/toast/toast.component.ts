// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { MessageService } from 'primeng/api';
// import { Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';
// import { IToaster } from '../../interfaces/common';
// import { ToastService } from '../../services/toast.service';
// @Component({
//   selector: 'app-toast-control',
//   templateUrl: './toast.component.html',
//   styleUrls: ['./toast.component.scss'],
//   providers: [MessageService],
// })
// export class ToastControlComponent implements OnInit, OnDestroy {
//   private readonly destroyed$ = new Subject<void>();

//   constructor(
//     private messageService: MessageService,
//     private toasterService: ToastService
//   ) {}

//   // ngOnInit() {
//   //   this.toasterService.loaderState$
//   //     .pipe(takeUntil(this.destroyed$))
//   //     // .subscribe((state: IToaster) => {
//   //     //   if (state.message) {
//   //     //     this.messageService.add({
//   //     //       key: 'errorToaster',
//   //     //       severity: state.severity,
//   //     //       summary: state.summary,
//   //     //       detail: state.message,
//   //     //       life: state.time,
//   //         });
//   //       }
//   //     });
//   // }

//   ngOnDestroy() {
//     this.destroyed$.next();
//     this.destroyed$.complete();
//   }
// }
