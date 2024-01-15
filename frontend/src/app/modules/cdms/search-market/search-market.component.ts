import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Router } from '@angular/router';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';

import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';
import { IVehicleDetails } from '../../interfaces/inventory';

@Component({
  selector: 'app-search-market',
  templateUrl: './search-market.component.html',
  styleUrls: ['./search-market.component.scss']
})
export class SearchMarketComponent extends BaseComponent implements OnInit{

  constructor(private apiService: ApiHelperService, private router: Router){
    super()
  }


  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];
  vehicleDetails: any[] = [];
  showroomId = localStorage.getItem("Showroom Id");
  


  ngOnInit() {
    this.getVehicleDetails();

  }


  getVehicleDetails() {
    this.apiService
    .get(`/inventory/getMarketInventory/${this.showroomId}`)
    .subscribe((attributes: IVehicleDetails[]) => {
      this.vehicleDetails = attributes;
      attributes.forEach((vehicleDetails: IVehicleDetails) => {
      });
    });
  } 

  redirect(inventoryId:string){

    this.router.navigate(['/detail-view', inventoryId]);
    console.log(inventoryId);
  }

  

  }


