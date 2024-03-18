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
  }


  

  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];

  selectedTabIndex: number = 0;
  status: string[] = ['received', 'sent'];

  showroomId :string | null=  localStorage.getItem('Showroom Id')



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
}


getNotification(){
  console.log(this.status[this.selectedTabIndex]);
  console.log(this.showroomId);
  this.apiService.get(`/notification/updateRequestStatus/${this.showroomId}/${this.status[this.selectedTabIndex]}`).subscribe((data) => {
    this.data = data;
    console.log( this.data);
    console.log(this.status[this.selectedTabIndex]);
    console.log(this.showroomId);
  });
}





}
