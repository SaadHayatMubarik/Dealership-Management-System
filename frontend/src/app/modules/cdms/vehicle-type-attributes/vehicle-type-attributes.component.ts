import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { IVehicleTypeAttribute } from '../../interfaces/inventory';
import { IVehicleType } from '../../interfaces/inventory';
import { SelectItem } from 'primeng/api';


import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';

@Component({
  selector: 'app-vehicle-type-attributes',
  templateUrl: './vehicle-type-attributes.component.html',
  styleUrls: ['./vehicle-type-attributes.component.css']
})
export class VehicleTypeAttributesComponent  extends BaseComponent implements OnInit {


 
  vehicleTypeAttribute: IVehicleTypeAttribute = {
    vehicleAttributeName:'',
    attributeInputType:'',
    vehicleAttributeValue:[],
    vehicleType:''
  };


  vehicleTypes: any[] = [];
  
 
  // vehicleTypeinput: { label: string, value: number }[] = [];
  

  
  
  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];
  inputTypes: any[] = ['TEXT', 'NUMBER', 'DATE', 'DROPDOWN'];


 
  
  
  
  constructor(private readonly apiService: ApiHelperService){
    super()
   
      
  }


  ngOnInit() 

  {
    this.getVehicleTypeAttribute();
    this.vehicleTypes= this.apiService.getVehicleTypes();
    

    

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
        command: () => {
          // this.delete(Id);
        },
      },
    ];
  }

  
  resetForm() {
    this.vehicleTypeAttribute.vehicleAttributeName = "";
    this.vehicleTypeAttribute.attributeInputType = '';
    this.vehicleTypeAttribute.vehicleAttributeValue = [];
    this.vehicleTypeAttribute.vehicleType = '';
  }

  getVehicleTypeAttribute(){
    this.apiService.get('/vehicle-type-attribute/getVehicleAttribute').subscribe((data) => {
      this.data = data;
    });
  }
 
  saveVehicleTypeAttribute() {
    if (this.vehicleTypeAttribute.vehicleAttributeName !== '') {
      this.apiService
        .post('/vehicle-type-attribute/addVehicleTypeAttribute', this.vehicleTypeAttribute)
        .subscribe({
          next: (response) => {
            this.resetForm();
            this.closeModal();
            this.getVehicleTypeAttribute();
            console.log("successs");
          },
          error: () => {
            console.log("unsucessful");
            
          },
       
        });
    }
  }

 


}






 



