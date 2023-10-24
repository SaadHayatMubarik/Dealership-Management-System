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
// import { IVehicleType } from '../../interfaces/inventory';

import { ApiHelperService } from 'src/app/shared/services/api-helper.service';

@Component({
  selector: 'app-vehicle-type-attributes',
  templateUrl: './vehicle-type-attributes.component.html',
  styleUrls: ['./vehicle-type-attributes.component.css']
})
export class VehicleTypeAttributesComponent  extends BaseComponent implements OnInit {

  VehicleAttributeName: string = '';

  vehicleTypeAttribute: IVehicleTypeAttribute = {
    vehicleTypeAttributeId: 0,
    attributeValue: this.VehicleAttributeName,
    attributeName: '',
    inputType: '',
    vehicleTypeName: '',
  };


  vehicleTypes: any[] = [];
  
  
  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];
  isRequired: string[] = ['YES', 'NO'];
  inputTypes: string[] = ['TEXT', 'NUMBER', 'DATE', 'DROPDOWN'];
  inputTypesOptions: SelectItem[] = [];
  
  
  constructor(private readonly apiService: ApiHelperService){
    super()
    
    this.inputTypesOptions = this.inputTypes.map((type) => ({
      label: type,
      value: type,
    }));
 
  }


  ngOnInit() 

  {

    this.vehicleTypes = this.apiService.getVehicleTypes();

   this.columns = [ 
    {
      field: 'type_name',
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
      {
        field: '',
        fieldTitle: 'Is Required',
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

 
  saveVehicleTypeAttribute()
  {
   

  }


}






 



