import { Component,OnInit } from '@angular/core';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { Router } from '@angular/router';


import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent extends BaseComponent {

  ngOnInit(){
 
  this.getNotification();
  this.sentNotification();
  }


  

  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];
  selectedTabIndex: number = 0;
  status: string[] = ['received', 'sent'];
  sent_status:string = "sent";
  receive_status:string = "receive";
  showroomId :string | null=  localStorage.getItem('Showroom Id')
  details:any[]= [];
  sent:any[]= [];
  notifications: any = '';

 



  constructor(  
    private readonly apiService: ApiHelperService,
    private toast: ToastService,
    private router: Router
){
  super()
}


handleTabChange(event: any) {
  // Update selectedTabIndex based on the index of the selected tab
  this.selectedTabIndex = event.index;
  this.getNotification;
}





getNotification(){
  this.apiService.get(`/notification/getRequest/${this.showroomId}/${this.status[this.selectedTabIndex]}`).subscribe((data) => {
  this.details = data
  console.log('details', this.details);
  });
}

sentNotification(){
  this.apiService.get(`/notification/getRequest/${this.showroomId}/${this.sent_status}`).subscribe((data) => {
    this.sent = data
    console.log('sent', this.sent);
    console.log('status', this.sent_status);
    });

}

// {notificationId}/{updatedStatus}

changeStatus(notification_id:number ,status: string){
  this.apiService
  .patch(`/notification/updateRequestStatus/${notification_id}/${status}`,) 
  .subscribe({
    next: (response) => {
      this.toast.showSuccess('Request:', status);
      console.log('success',status)
      console.log('success',notification_id)
      this.getNotification();
      // localStorage.setItem('lastRequestTime', new Date().getTime().toString());
    },
    error: () => {
      this.toast.showError('Error Occured.');
      console.log('fail',status);
      console.log('fail',notification_id);
      this.getNotification();
      // console.log()
    },
  });

}




}
