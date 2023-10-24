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
import { VehicleTypeAttributesComponent } from './vehicle-type-attributes/vehicle-type-attributes.component';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { LoginComponent } from './login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChipsModule } from 'primeng/chips';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';




@NgModule({
  declarations: [
    VehicleTypeComponent,
    AddInventoryFormComponent,
    VehicleTypeAttributesComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    CdmsRoutingModule,
    CommonModule,
    FormsModule,
    AppSharedModule,
    SidebarModule,
    ToastModule,
    CheckboxModule,
    TabViewModule,
    DropdownModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    ChipsModule,
    InputNumberModule,
    CalendarModule,
    RatingModule,
    InputTextareaModule
   
  ],
  providers: [],
})
export class CdmsModule { }
