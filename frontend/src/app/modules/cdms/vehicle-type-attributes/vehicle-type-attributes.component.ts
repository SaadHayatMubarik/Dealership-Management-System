import { Component, ErrorHandler, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import {  IVehicleTypeAttribute } from '../../interfaces/inventory';
import { DialogControlService } from 'src/app/shared/services/dialog.service';
import { ToastService } from 'src/app/shared/services/toast.service';

import { IUpdateAttr, IUpdateVehicleAttr, IUpdateVehicleType } from '../../interfaces/update';

import { AuthService } from 'src/app/shared/services/auth.service';


import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-vehicle-type-attributes',
  templateUrl: './vehicle-type-attributes.component.html',
  styleUrls: ['./vehicle-type-attributes.component.css'],

})
export class VehicleTypeAttributesComponent  extends BaseComponent implements OnInit {


 
  vehicleTypeAttribute: IVehicleTypeAttribute = {
    vehicleAttributeName:'',
    attributeInputType:'',
    vehicleAttributeValue:[],
    vehicleType:'',
    ShowroomId : localStorage.getItem("Showroom Id"),
  };


  vehicleTypes: any[] = [];
  selectedVehicleTypeAttributeId: any; 
  inputTypes: any[] = ['TEXT', 'NUMBER', 'DATE', 'DROPDOWN'];
  modalVisible = false;
  updateSidebarVisible = false; 
  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];
  
  showroomID :any; 
  vehicle_attribute_id: number = 0;

  
  constructor(private readonly apiService: ApiHelperService, 
              private toastService:ToastService,
              private authService: AuthService) {
    super()
      
  }

  updateVehicleType: IUpdateVehicleType = {
    type_id: 0,
    type_name: ''
  }



  updateVehicleAttr: IUpdateAttr ={
    attribute_id: 0,
    attribute_name: '',
    input_type: '',
    vehicleType:  this.updateVehicleType
  }





  updateAttr: IUpdateVehicleAttr = {
    VehicleTypeAttribute: this.updateVehicleAttr,
    MultiValueAttribute: []
  }
 

  @ViewChild('updatedVehicleAttribute') updateVehicleAttributeForm!:NgForm;
  ngOnInit() 

  {
    this.getVehicleTypes(); 
    this.getVehicleTypeAttribute();
   
   this.columns = [
    {
      field: 'vehicleTypeName',
      fieldTitle: 'Vehicle Type Name',
    },
    {
        field: 'vehicleAttributeName',
        fieldTitle: 'Attribute Name',
      },
      {
        field: 'vehicleAttributeValue',
        fieldTitle: 'Attribute Value',
      },
      {
        field: 'attributeInputType',
        fieldTitle: 'Input Type',
      },
      
    
    ];

    this.actions = [
      {
        label: ' Delete',
        icon: 'pi pi-trash',
        command: (event) => {
          this.selectedVehicleTypeAttributeId = event.vehicleAttributeId;
              this.apiService.delete(`/vehicle-type-attribute/${this.selectedVehicleTypeAttributeId}`).subscribe({
                next: (response) => {
                  this.getVehicleTypes();
                  this.getVehicleTypeAttribute();
                  this.toastService.showSuccess( `${event.vehicleAttributeName} attribute deleted.`);
                  console.log(this.selectedVehicleTypeAttributeId);
                  
                },
                error: () => 
                {
                  this.toastService.showError();
                  console.log(this.selectedVehicleTypeAttributeId);
                }
              }
                );
              },
              permission: 'delete.vehicleTypeAttribute'
              
             
            },
      {
        label: 'Update',
        icon: 'pi pi-file-edit',
        command: (event) => {
          
          this.vehicle_attribute_id = event.vehicleAttributeId;
          
          this.updateSidebarVisible = true;
          this.getVehicleAtt(this.vehicle_attribute_id);

        },
        permission: 'update.vehicleTypeAttribute'
      },
    ];

    this.actions = this.actions.filter(action => !action.permission || this.authService.hasPermission(action.permission));
  }






  getVehicleTypes() {
    this.apiService.get(`/vehicle-type/${this.vehicleTypeAttribute.ShowroomId}`).subscribe({
      next: (response: IObject[]) => {
        this.vehicleTypes = response;
        console.log(this.vehicleTypes);
        
      },
      error: () => {
        this.toastService.showError();
      },
    });
  }
  
  getVehicleTypeAttribute(){
    this.apiService.get(`/vehicle-type-attribute/getVehicleAttribute/${this.vehicleTypeAttribute.ShowroomId}`).subscribe((data) => {
      this.data = data;
      console.log(this.data);
    });
  }
 
  resetForm() {
    this.vehicleTypeAttribute.vehicleAttributeName = "";
    this.vehicleTypeAttribute.attributeInputType = '';
    this.vehicleTypeAttribute.vehicleAttributeValue = [];
    this.vehicleTypeAttribute.vehicleType = '';
  }

  saveVehicleTypeAttribute() {
    if (this.vehicleTypeAttribute.vehicleAttributeName !== '') {
      if(this.vehicleTypeAttribute.attributeInputType != 'DROPDOWN'){
        this.vehicleTypeAttribute.vehicleAttributeValue[0] = '';
      }
      this.apiService
        .post('/vehicle-type-attribute/addVehicleTypeAttribute', this.vehicleTypeAttribute)
        .subscribe({
          next: (response) => {
            this.resetForm();
            this.closeModal();
           this.toastService.showSuccess('New vehicle type attribute created.')
           this.getVehicleTypeAttribute();
           console.log(this.vehicleTypeAttribute);
          },
          error: () => {
           this.toastService.showError();
          },
        });
    }
  }

  isDropdownSelected(): boolean {
    return this.vehicleTypeAttribute.attributeInputType === 'DROPDOWN';
  }



  //get individual vehicle type attribute, check this api
  getVehicleAtt(vehicle_attribute_id: number){
    this.apiService.get(`/multi-value-attribute/getVehicleAttributeById/${vehicle_attribute_id}`).subscribe((data: IUpdateVehicleAttr) => {
      this.updateAttr = data;
      this.updateVehicleAttr.attribute_id = this.updateAttr.VehicleTypeAttribute.attribute_id;
 
    });
  }


  update(){
    this.updateVehicleAttr.attribute_name = this.updateAttr.VehicleTypeAttribute.attribute_name;
    this.apiService.put('/vehicle-type-attribute/updateVehicleTypeAttribute/',this.updateVehicleAttr).subscribe({
      next:(res)=>{
        this.toastService.showSuccess('Customer Updated.');
        this.updateSidebarVisible = false;
        this.getVehicleTypeAttribute();
        
      },
      error: () => {
        this.toastService.showError('Error Occured');
      },
    })
  }
}




 



