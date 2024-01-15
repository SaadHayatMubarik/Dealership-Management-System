import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { BaseComponent } from 'src/app/shared/base.component';
import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';


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

  ngOnInit(){
    this.getVehicleDetails();



  }


getVehicleDetails(){
  this.apiService.get(`/inventory/getMarketInventory/{showroomId}`).subscribe((data) => {
    this.data = data;
    console.log(data);
  });
 
}


}
