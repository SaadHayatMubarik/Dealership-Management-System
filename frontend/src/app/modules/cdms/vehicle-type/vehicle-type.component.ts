import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { NgForm } from '@angular/forms';


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
  

  vehicleId: string = '';
  updatedType: string = '';
  // modalVisible = false;
  updateSidebarVisible = false;


  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];
  constructor(private readonly apiService: ApiHelperService, 
    private toast : ToastService, 
    private dialogService: DialogControlService, 
    private router: Router) {
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
        
        
      },
      {
        label: 'Update',
        icon: 'pi pi-file-edit',
        command: (event) => {
          this.vehicleId = event.type_id;
          this.updateSidebarVisible = true;
        },
      },

    ];
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

    if (this.vehicleType.vehicleTypeName != "^\S+$" ){
  
    this.apiService.patch(`/vehicle-type/updateVehicleType/${this.updatedType}/${this.vehicleId}`).subscribe(
        next => {
        this.toast.showSuccess('Updated Successfully');
        this.updateSidebarVisible =false;
        this.getVehicleType();
      },
      error => {
        this.toast.showError("field is empty");
      }
    )
  }
}
}



    
    

    
 


  
 

