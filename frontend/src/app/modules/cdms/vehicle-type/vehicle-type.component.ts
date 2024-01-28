import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';


import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';
import { IVehicleType } from '../../interfaces/inventory';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { DialogControlService } from 'src/app/shared/services/dialog.service';


@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.css'],
})
export class VehicleTypeComponent extends BaseComponent implements OnInit {
  vehicleType: IVehicleType = {
    vehicleTypeName: '',
    showroomId: localStorage.getItem("Showroom Id"),
  };
  

  selectedVehicleTypeId: string = '';

  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];
  constructor(private readonly apiService: ApiHelperService, private toast : ToastService, private dialogService: DialogControlService) {
    super();
  }

  ngOnInit() {

    this.getVehicleType();
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
          this.selectedVehicleTypeId = event.type_id;
              this.apiService.delete(`/vehicle-type/${this.selectedVehicleTypeId}`).subscribe({
                next: (response) => { 
                  this.getVehicleType();
                  this.toast.showSuccess("Vehicle Type Deleted.");
                },
                error: () => 
                {
                  this.toast.showError('Using type in inventory. Record cant be deleted!');
                }
              }
                );         
        },
        
      },
    ];
  }



  
  saveVehicleType() {
    if (this.vehicleType.vehicleTypeName != '') {
      this.apiService
        .post('/vehicle-type/addVehicleType', this.vehicleType)
        .subscribe({
          next: (response) => {
            console.log(this.vehicleType);
            console.log(response);
            this.closeModal();
            this.getVehicleType();
            this.vehicleType.vehicleTypeName = "";
            this.toast.showSuccess('New vehicle type created.')
          },
          error: () => {
            this.toast.showError();
          },
        });
    }
  }


  

  getVehicleType() {
    this.apiService.get(`/vehicle-type/${this.vehicleType.showroomId}`).subscribe((data) => {
      this.data = data;
    });
  }


}

  
 

