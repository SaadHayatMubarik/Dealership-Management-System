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
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.css'],
})
export class VehicleTypeComponent extends BaseComponent implements OnInit {
  vehicleType: IVehicleType = {
    vehicleTypeId: 0,
    vehicleTypeName: '',
    ShowroomId: 0
  };
  

  selectedVehicleTypeName: string = '';

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
          this.selectedVehicleTypeName = event.type_name;
          

              this.apiService.delete(`/vehicle-type/${this.selectedVehicleTypeName }`).subscribe({
                next: (response) => {
                  console.log(this.selectedVehicleTypeName);  
                  this.getVehicleType();
                  this.toast.showSuccess( "Vehicle Type Deleted.");
                },
                error: () => 
                {
                  this.toast.showError();
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

  getShowroomId(){
    const showroomDataString = localStorage.getItem('Showroom Id');
    if (showroomDataString !== null) {
        const showroomData = JSON.parse(showroomDataString);
        const showroomId = showroomData.showroomShowroomId;
        console.log(showroomId);
       
    } else {
       return console.log("api error");   
    }
  }
  

  getVehicleType() {
    
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
    // });

    this.apiService.get('/vehicle-type/{showroomId}' ).subscribe((data) => {
      this.data = data;
      console.log(this.getShowroomId);
    });
  }


}

  
 

