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
        field: 'vehicleTypeId',
        fieldTitle: 'Vehicle Type Id',
      },
      {
        field: 'vehicleTypeName',
        fieldTitle: 'Vehicle Type Name',
      },
    ];
    this.actions = [
      {
        label: ' Edit',
        icon: 'pi pi-pencil',
        command: (event) => {
          this.edit(event.vehicleTypeId);
        },
      },
    ];


    
  }

  edit(id: number) {}

  save() {
    if (this.vehicleType.vehicleTypeName != '') {
      this.apiService.post('/vehicle-type/addVehicleType', this.vehicleType).subscribe({
        next: (response) => {
          console.log(this.vehicleType.vehicleTypeName)
          this.closeModal();
          // 
          
        },
        error: () => {
          console.log('toast call karwana');
          
        }
      })
    }
  }
  dataForDropdown: any[] = [];
  selectedItem: any;

  get() {
    this.apiService.get('/vehicle-type/getVehicleType').subscribe((data) => {
      this.dataForDropdown = data;
    });
  }

  delete(){}



 

}




