import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdmsRoutingModule } from './cdms-routing.module';
import { VehicleTypeComponent } from './vehicle-type/vehicle-type.component';
import { CommonModule } from '@angular/common';
import { AppSharedModule } from 'src/app/shared/app.shared.module';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { TabViewModule } from 'primeng/tabview';
import { AddInventoryFormComponent } from './add-inventory-form/add-inventory-form.component';

@NgModule({
  declarations: [
    VehicleTypeComponent,
    AddInventoryFormComponent
  ],
  imports: [
    CdmsRoutingModule,
    CommonModule,
    FormsModule,
    AppSharedModule,
    SidebarModule,
    ToastModule,
    CheckboxModule,
    TabViewModule
  ],
  providers: [],
})
export class CdmsModule { }
