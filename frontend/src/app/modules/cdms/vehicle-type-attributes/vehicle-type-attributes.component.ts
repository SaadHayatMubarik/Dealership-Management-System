import { Component, ErrorHandler, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { IVehicleTypeAttribute } from '../../interfaces/inventory';
import { DialogControlService } from 'src/app/shared/services/dialog.service';
import { ToastService } from 'src/app/shared/services/toast.service';




import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';

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
    vehicleType:''
  };


  vehicleTypes: any[] = [];
  selectedVehicleTypeAttributeName: any; 
  inputTypes: any[] = ['TEXT', 'NUMBER', 'DATE', 'DROPDOWN'];
  
  
  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];
  
  showroomID :any; 


 
  
  
  
  constructor(private readonly apiService: ApiHelperService, 
              private dialogService: DialogControlService ,
              private toastService:ToastService) {
    super()
   
      
  }


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
          this.selectedVehicleTypeAttributeName = event.vehicleAttributeName;
           
              this.apiService.delete(`/vehicle-type-attribute/${this.selectedVehicleTypeAttributeName}`).subscribe({
                next: (response) => {
                  this.getVehicleTypes();
                  this.getVehicleTypeAttribute();
                  this.toastService.showSuccess( `${this.selectedVehicleTypeAttributeName} attribute deleted.`);
                },
                error: () => 
                {
                  this.toastService.showError();
                }
              }
                );
              }
             
            },
      {
        label: 'Update',
        icon: 'pi pi-file-edit',
        command: (event) => {
          ;
        },
      },
    ];
  }

  


  getVehicleTypes() {
    this.apiService.get('/vehicle-type/getVehicleType').subscribe({
      next: (response: IObject[]) => {
        this.vehicleTypes = response;
      },
      error: () => {
        this.toastService.showError();
      },
    });
  }

  getVehicleTypeAttribute(){

    
    this.apiService.get('/vehicle-type-attribute/getVehicleAttribute' ).subscribe((data) => {
      this.data = data;
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
      this.apiService
        .post('/vehicle-type/addVehicleType', this.vehicleTypeAttribute)
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



}






 



