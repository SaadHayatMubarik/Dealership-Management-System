import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { NgForm } from '@angular/forms';



import { AuthService } from 'src/app/shared/services/auth.service';


import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';
import { IVehicleType } from '../../interfaces/inventory';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { DialogControlService } from 'src/app/shared/services/dialog.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';


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
  

  vehicleId: number = 0;
  updatedType: string = '';
  // modalVisible = false;
  updateSidebarVisible = false;


  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];
  constructor(private readonly apiService: ApiHelperService, 
    private toast : ToastService, 
    private authService: AuthService) {
    super();
  }
//   public noWhitespaceValidator(control: FormControl) {
//     return (control.value || '').trim().length? null : { 'whitespace': true };       
// }

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
          this.vehicleId = event.type_id;
              this.apiService.delete(`/vehicle-type/${this.vehicleId}`).subscribe({
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
        permission: 'delete.vehicleType'
        
        
      },
      {
        label: 'Update',
        icon: 'pi pi-file-edit',
        command: (event) => {
          this.vehicleId = event.type_id;
          this.updateSidebarVisible = true;
        },
        permission: 'update.vehicleType'
      },

    ];
    this.actions = this.actions.filter(action => !action.permission || this.authService.hasPermission(action.permission));
  }

  @ViewChild('vehicleTypeForm') typeForm!: NgForm;

  saveVehicleType() {
    if (this.typeForm.valid){
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

    else{
      this.toast.showError('Please  fill out  field correctly.');
    }
  }

  getVehicleType() {
    this.apiService.get(`/vehicle-type/${this.vehicleType.showroomId}`).subscribe((data) => {
      this.data = data;
      
    });
  }


  
  updateVehicleType(){

    const trimmedType = this.updatedType.trim();

    if(trimmedType != ''){
      this.apiService.patch(`/vehicle-type/updateVehicleType/${trimmedType}/${this.vehicleId}`).subscribe(
        next => {
        this.toast.showSuccess('Updated Successfully');
        this.updateSidebarVisible = false;
        this.getVehicleType();
      },
      error => {
        console.log('API ERROR', error)
      this.toast.showError('Server Error! Please try again later.');
      },
    )
    }
    else {
      this.toast.showError('Fill the field Correctly')
    }
  
}
}



    
    

    
 


  
 

