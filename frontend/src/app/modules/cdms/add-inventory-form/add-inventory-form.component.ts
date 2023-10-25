import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';
import { IInventory } from '../../interfaces/inventory';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';

@Component({
  selector: 'app-add-inventory-form',
  templateUrl: './add-inventory-form.component.html',
  styleUrls: ['./add-inventory-form.component.scss']
})
export class AddInventoryFormComponent extends BaseComponent implements OnInit{

  vehicleInventory: IInventory = {
    vehicleMake: '',
    vehicleModel: '',
    vehicleVariant:'',
    modelYear: 0,
    vehicleChasisNo:'',
    costPrice: 0,
    demand: 0,
    dateOfPurchase:'',
    dateOfSale: '',
    bodyColor: '',
    engineNo: '',
    grade: 0,
    status: '',
    regNo: '',
  };

  
 vehicleTypes: any[] = [];
 status: string[] = ['Available', 'Unavailable', 'Upcoming'];
 sliderValue: number = 0; 

 onInputChange(event: any) {
  const inputValue = event.target.value;
  const parsedValue = parseFloat(inputValue);
  
  if (!isNaN(parsedValue)) {
    if (parsedValue > 5) {
      this.sliderValue = 5; // Limit to a maximum value of 5
    } else {
      this.sliderValue = parsedValue;
    }
  } else {
    this.sliderValue = 0; // Reset to 0 for non-numeric input
  }
}

 
  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];
  constructor(private readonly apiService: ApiHelperService) {
    super();
  }




  ngOnInit() {

    this.vehicleTypes = this.apiService.getVehicleTypes();
    
    this.columns = [
      {
        field: '',
        fieldTitle: 'Vehicle Type',
      },
      {
        field: '',
        fieldTitle: 'Make',
      },
      {
        field: '',
        fieldTitle: 'Model',
      },
      {
        field: '',
        fieldTitle: 'Variant',
      },
      {
        field: '',
        fieldTitle: 'Demand',
      },
      {
        field: '',
        fieldTitle: 'Status',
      },
      {
        field: '',
        fieldTitle: 'Body Color',
      },
    ];
    this.actions = [
      {
        label: ' Delete',
        icon: 'pi pi-trash',
        command: () => {
          ;
        },
      },
      {
        label: 'Edit',
        icon: 'pi pi-file-edit',
        command: () => {
          ;
        },
      },
    ];

   
  }


}
