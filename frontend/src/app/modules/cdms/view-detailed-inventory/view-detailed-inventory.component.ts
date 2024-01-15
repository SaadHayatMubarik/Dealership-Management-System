import { Component, OnInit } from '@angular/core';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';
import { ToastService } from 'src/app/shared/services/toast.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { IInventoryDetails} from '../../interfaces/inventory';
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
vehicleDetails: any[] = [];
showroomId = localStorage.getItem("Showroom Id");
inventoryId : number = 0;




  ngOnInit() {
    this.getvehicleDetail();

    this.route.params.subscribe(params => {
      this.inventoryId = params['inventoryId']; 
      console.log(this.inventoryId);
    });



  }

  getvehicleDetail(){
    // this.apiService
    // .get(`/inventory/getInventoryDetails/${this.inventoryId}`)
    // .subscribe((attributes: IInventoryDetails[]) => {
    //   this.vehicleDetails = attributes;
    //   attributes.forEach((vehicleDetails: IInventoryDetails) => {
    //     console.log(vehicleDetails);
    //     console.log("working or not");
    //   });
    // });
    this.apiService.get(`/inventory/getInventoryDetails/${this.inventoryId}`).subscribe((data) => {
      this.data = data;
      console.log(data);
      console.log('api working');
      console.log(this.data);
    });
  }

  



}

