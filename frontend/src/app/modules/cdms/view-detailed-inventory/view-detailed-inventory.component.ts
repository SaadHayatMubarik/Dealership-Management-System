import { Component, OnInit } from '@angular/core';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { IObject} from 'src/app/shared/interfaces/common';
import { ToastService } from 'src/app/shared/services/toast.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-detailed-inventory',
  templateUrl: './view-detailed-inventory.component.html',
  styleUrls: ['./view-detailed-inventory.component.scss']
})
export class ViewDetailedInventoryComponent extends BaseComponent implements OnInit {

constructor(private apiService:ApiHelperService, private route: ActivatedRoute){
  super();
}

data: IObject[] = [];
vehicleDetails: any = '';
showroomId = localStorage.getItem("Showroom Id");
inventoryId : number = 0;

images: any[] = [
  { itemImageSrc: '../../../../assets/demo/images/car.jpg' },
  { itemImageSrc: '../../../../assets/demo/images/car.jpg' },
  { itemImageSrc: '../../../../assets/demo/images/car.jpg' },
  // Add more image objects as needed
];



  ngOnInit() {

    this.route.params.subscribe(params => {
      this.inventoryId = params['inventoryId']; 
      this.getvehicleDetail();
      console.log(this.inventoryId);
    });

    this.getvehicleDetail();
  }

  getvehicleDetail(){
    this.apiService
  .get(`/inventory/getInventoryDetails/${this.inventoryId}`)
  .subscribe(
    (data) => {
      this.vehicleDetails = data;
      console.log(this.vehicleDetails);
      console.log(this.vehicleDetails.demand);
    }
  );
  }
  
}

