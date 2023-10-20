import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { takeUntil } from 'rxjs/operators';

import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';
import { IVehicleType } from '../../interfaces/inventory';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.css'],
})
export class VehicleTypeComponent extends BaseComponent implements OnInit {
  vehicleType: IVehicleType = {
    vehicleTypeId: 0,
    vehicleTypeName: '',
  };
  
  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];
  constructor(private readonly apiService: ApiHelperService) {
    super();
  }

  ngOnInit() {
    this.columns = [
      {
        field: 'type_id',
        fieldTitle: 'Vehicle Type Id',
      },
      {
        field: 'type_name',
        fieldTitle: 'Vehicle Type Name',
      },
    ];
    this.actions = [
      {
        label: ' Delete',
        icon: 'pi pi-trash',
        command: (event) => {
          // this.delete( ); 
        },
      },
    ];

    this.get();
  }

  // edit(id: number) {}
  

  save() {
    if (this.vehicleType.vehicleTypeName != '') {
      this.apiService
        .post('/vehicle-type/addVehicleType', this.vehicleType)
        .subscribe({
          next: (response) => {
            this.closeModal();
           
          },
          error: () => {
            
          },
        });
    }
  }
  selectedItem: any;

  get() {
    this.apiService.get('/vehicle-type/getVehicleType').subscribe((data) => {
      // console.log(data);
      this.data = data;
    });
  }



  delete(vehicleType: IVehicleType): void {
    if (confirm('Are you sure you want to delete this item?')) {
        // const vehicleTypeName = JSON.parse(typeName);  
        console.log(vehicleType);
        this.apiService.delete('/vehicle-type/' + this.vehicleType.vehicleTypeId)
            .subscribe({
                next: (response) => {
                    this.get(); // Refresh the data after a successful delete
                },
                error: (error) => {
                    // Handle errors as needed
                    console.error('Error deleting vehicle type:', error);
                },
            });
    }
}

}

  






