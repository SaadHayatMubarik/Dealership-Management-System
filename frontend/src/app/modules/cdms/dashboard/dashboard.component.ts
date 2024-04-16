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
    this.getCustomerCount();
    this.getEmployeeCount(); 
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

inventoryCount : any;
getInventoryCount(){
  this.apiService.get(`/inventory/dashboard/TotalInventory/${this.showroomId}`).subscribe((data) => {
    this.inventoryCount = data
    });
}

customerCount : any;
getCustomerCount(){
  this.apiService.get(`/customer/dashboard/TotalCustomer/${this.showroomId}`).subscribe((data) => {
    this.customerCount = data
    });
}

employeeCount : any;
getEmployeeCount(){
  this.apiService.get(`/employee/dashboard/activeEmployee/${this.showroomId}`).subscribe((data) => {
    this.employeeCount = data
    console.log('Count:',this.employeeCount);
    });
}






redirect(inventoryId:string){
  this.router.navigate(['/detail-view', inventoryId]);
}

} 


  
  
   




