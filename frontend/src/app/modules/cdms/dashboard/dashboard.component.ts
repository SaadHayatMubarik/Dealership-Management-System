import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { BaseComponent } from 'src/app/shared/base.component';
import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';
import { IVehicleDetails } from '../../interfaces/inventory';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiHelperService) {
    super()
   }

   data: IObject[] = [];
   showroomId = localStorage.getItem("Showroom Id");
   vehicleDetails: any[] = [];
   
  //  vehicleDetails : IVehicleDetails = {
  //   inventoryId: 0,
  //   vehicleMake: '',
  //   vehicleModel: '',
  //   vehicleVariant: '',
  //   modelYear:0,
  //   demand: 0,
  //   mileage:0,
  //  };
 
    
 
   
  
  ngOnInit(){
    this.getVehicleDetails();



  }


// getVehicleDetails(){
//   this.apiService.get(`/inventory/getMarketInventory/${this.showroomId}`).subscribe((data) => {
//     this.vehicleDetails = data;
//     console.log(this.vehicleDetails);
//   });
// }

// getVehicleDetails() {
//   this.apiService.get(`/inventory/getMarketInventory/${this.showroomId}`).subscribe((data: IVehicleDetails) => {
//     this.vehicleDetails = data;
//     console.log('Vehicle Details:', this.vehicleDetails);
//   });
// } 



getVehicleDetails() {
  this.apiService
  .get(`/inventory/getMarketInventory/${this.showroomId}`)
  .subscribe((attributes: IVehicleDetails[]) => {
    this.vehicleDetails = attributes;
    console.log(this.vehicleDetails);
    attributes.forEach((vehicleDetails: IVehicleDetails) => {
      console.log(vehicleDetails.vehicleMake);
    });
  });
} 

redirect(inventoryId:string){
  this.router.navigate(['/detail-view', inventoryId]);
}


 
} 


  
  
   




