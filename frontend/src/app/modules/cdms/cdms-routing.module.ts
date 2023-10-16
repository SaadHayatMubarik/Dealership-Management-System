import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleTypeComponent } from './vehicle-type/vehicle-type.component';
import { AddInventoryFormComponent } from './add-inventory-form/add-inventory-form.component';
import { VehicleTypeAttributesComponent } from './vehicle-type-attributes/vehicle-type-attributes.component';


const routes: Routes = [
  {
    path: 'vehicle-type', 
    component: VehicleTypeComponent,
  },
  {
    path:'vehicle-type-attributes', 
    component:VehicleTypeAttributesComponent,
  },
  {
    path:'add-inventory', 
    component:AddInventoryFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CdmsRoutingModule { }
