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

  // vehicleType: IVehicleType = 
  // {
  //   vehicleTypeId : 0,
  //   vehicleTypeName:''

  // }


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
   
    this.vehicleTypes= this.apiService.getVehicleTypes();
    

    

   this.columns = [ 
    {
      field: '',
      fieldTitle: 'Vehicle Type',
    },
    {
        field: '',
        fieldTitle: 'Attribute Name',
      },
      {
        field: '',
        fieldTitle: 'Attribute Value',
      },
      {
        field: '',
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
    this.apiService.get('/vehicle-type-attribute/getVehicleTypeAttribute').subscribe((data) => {
      // console.log(data);
      this.data = data;
    });

  }
 
  saveVehicleTypeAttribute() {
    if (this.vehicleTypeAttribute.vehicleAttributeName !== '') {
      this.apiService
        .post('/vehicle-type-attribute/addVehicleTypeAttribute', this.vehicleTypeAttribute)
        .subscribe({
          next: (response) => {
            this.closeModal();
            this.resetForm;
            this.getVehicleTypeAttribute;
            console.log("successs");

          },
          error: () => {
            console.log("unsucessful");
            
          },
       
        });
    }
  }

 


}






 



