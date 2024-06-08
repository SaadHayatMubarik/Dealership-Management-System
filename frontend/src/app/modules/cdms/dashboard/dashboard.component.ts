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

  revenue: any;
  months: any;

  constructor(private router: Router, private apiService: ApiHelperService) {
    super()
   }

   data: IObject[] = [];
   showroomId = localStorage.getItem("Showroom Id");
   vehicleDetails: any[] = [];
   status : string = "AVAILABLE";
   
  
  ngOnInit(){

    this.months = {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Months'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Revenue'
          }
        }
      }
    };

    this.revenue = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Revenue',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [5000, 7000, 8000, 12000, 15000, 17000, 20000, 18000, 22000, 24000, 26000, 30000]
        }
      ]
    };
    
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
    console.log('vehicle details', vehicleDetails.vehicleMake);
    });
  });
} 

dashboardData : any;
getInventoryCount(){
  this.apiService.get(`/dashboard/dashboard/${this.showroomId}`).subscribe((data) => {
    this.dashboardData = data
    console.log(this.dashboardData);
    });
}

redirect(inventoryId:string){
  this.router.navigate(['/detail-view', inventoryId]);
}

} 


  
  
   




