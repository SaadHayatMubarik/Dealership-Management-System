import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { IVehicleTypeAttribute } from '../../interfaces/inventory';

@Component({
  selector: 'app-vehicle-type-attributes',
  templateUrl: './vehicle-type-attributes.component.html',
  styleUrls: ['./vehicle-type-attributes.component.css']
})
export class VehicleTypeAttributesComponent  extends BaseComponent implements OnInit {

  // vehicleType: IVehicleTypeAttribute = {
  //   vehicleTypeId: 0, vehicleTypeName: ''
  // };
  // columns: DataTableColumn[] = [];
  // actions: IDataTableAction[] = [];
  // data: IObject[] = [];
  inputTypes: string[] = ['TEXT', 'NUMBER', 'DATE', 'DROPDOWN']
  constructor() { 
    super();
  }

  // constructor() { }

  ngOnInit() {
  }

}
