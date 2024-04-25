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
   status : string = "AVAILABLE";
   
  
  ngOnInit(){
    this.getVehicleDetails();
    this.getInventoryCount();
  }

getVehicleDetails() {
  this.apiService
  .get(`/inventory/getMarketInventory/${this.showroomId}/${this.status}`)
  .subscribe((attributes: IVehicleDetails[]) => {
    this.vehicleDetails = attributes;
    console.log(this.vehicleDetails);
    attributes.forEach((vehicleDetails: IVehicleDetails) => {
      console.log(vehicleDetails.vehicleMake);
    });
  });
} 

dashboardData : any;
getInventoryCount(){
  this.apiService.get(`/dashboard/dashboard/${this.showroomId}`).subscribe((data) => {
    this.dashboardData = data
    });
}







redirect(inventoryId:string){
  this.router.navigate(['/detail-view', inventoryId]);
}

} 


  
  
   




