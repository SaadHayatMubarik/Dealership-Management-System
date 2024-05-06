import { Component, OnInit } from '@angular/core';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { IObject} from 'src/app/shared/interfaces/common';
import { ToastService } from 'src/app/shared/services/toast.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { ActivatedRoute } from '@angular/router';
import { INotification } from '../../interfaces';

@Component({
  selector: 'app-view-detailed-inventory',
  templateUrl: './view-detailed-inventory.component.html',
  styleUrls: ['./view-detailed-inventory.component.scss']
})
export class ViewDetailedInventoryComponent extends BaseComponent implements OnInit {

constructor(private apiService:ApiHelperService, 
  private route: ActivatedRoute,
  private toast:ToastService)
  {
  super();
}

data: IObject[] = [];
vehicleDetails: any = '';
showroomId = localStorage.getItem("Showroom Id");
inventoryId : number = 0;

minValue: number = 0;
maxValue: number = 0 ;
range: number[] = [800000, 1000000];

images: any[] = [
  { itemImageSrc: '../../../../assets/demo/images/car.jpg' },
  { itemImageSrc: '../../../../assets/demo/images/car.jpg' },
  { itemImageSrc: '../../../../assets/demo/images/car.jpg' },
  // Add more image objects as needed
];

notification : INotification = 
{
  inventoryId: 0,
  showroomId: this.showroomId,
  min_value : this.minValue,
  max_value: this.maxValue
}


  ngOnInit() {

    this.route.params.subscribe(params => {
      this.inventoryId = params['inventoryId']; 
      this.getvehicleDetail();
      this.notification.inventoryId=this.inventoryId;
    });
  
    
    // this.getvehicleDetail();
  }

  updateMinMaxValues() {
    this.minValue = this.range[0];
    this.maxValue = this.range[1];
  }

 

  getvehicleDetail(){
    this.apiService
  .get(`/inventory/getInventoryDetails/${this.inventoryId}`)
  .subscribe(
    (data) => {
      this.vehicleDetails = data;
    }
  );
  }

  disableButton(){
    const vehicleShowroomId = this.vehicleDetails.showroom.showroom_id;
    console.log(vehicleShowroomId);
    if (this.showroomId == vehicleShowroomId)
    {
      return true;
    }
    else{
      return false;
    }
  }


  sendNotification()
  {

    this.notification.min_value = this.minValue;
    this.notification.max_value = this.maxValue;
    this.apiService
    .post('/notification/sendRequest',this.notification )
    .subscribe({
      next: (response) => {
        this.toast.showSuccess('Notification Sent');
        console.log(this.notification);
        localStorage.setItem('lastRequestTime', new Date().getTime().toString());
      },
      error: () => {
        this.toast.showError('Error Occured.');
        console.log('error:', this.notification);
      },
    });
  }

  // sendNotification() {
  //   // Assuming this.notification is your request data
  //   this.apiService.postLogin('/notification/sendRequest', this.notification)
  //     .subscribe({
  //       next: (response) => {
  //         this.toast.showSuccess('Notification Sent');
  //         console.log(this.notification);
  //         // Save the current timestamp to local storage
  //         localStorage.setItem('lastRequestTime', new Date().getTime().toString());
  //         // Disable the button or take any other action as needed
  //       },
  //       error: () => {
  //         this.toast.showError('Error Occurred.');
  //         console.log(this.notification);
  //       },
  //     });
  // }
  
  // isRequestSentInLast24Hours(): boolean {
  //   // Get the timestamp of the last request from local storage
  //   const lastRequestTime = localStorage.getItem('lastRequestTime');
  //   if (lastRequestTime) {
  //     const currentTime = new Date().getTime();
  //     const lastRequestTimestamp = parseInt(lastRequestTime, 10);
  //     // Calculate the difference in milliseconds between current time and last request time
  //     const timeDifference = currentTime - lastRequestTimestamp;
  //     // Check if a request was sent in the last 24 hours
  //     return timeDifference < 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  //   }
  //   return false; // Return false if no previous request was sent
  // }
  

  
}

