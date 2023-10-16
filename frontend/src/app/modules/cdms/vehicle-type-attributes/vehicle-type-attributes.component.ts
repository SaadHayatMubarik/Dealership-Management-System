import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'app-vehicle-type-attributes',
  templateUrl: './vehicle-type-attributes.component.html',
  styleUrls: ['./vehicle-type-attributes.component.css']
})
export class VehicleTypeAttributesComponent  extends BaseComponent implements OnInit {

  // vehicleType: IVehicleType = {
  //   vehicleTypeId: 0, vehicleTypeName: ''
  // };
  // columns: DataTableColumn[] = [];
  // actions: IDataTableAction[] = [];
  // data: IObject[] = [];
  
  constructor() { 
    super();
  }

  // constructor() { }

  ngOnInit() {
  }

}
