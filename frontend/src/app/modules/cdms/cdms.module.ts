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
import { InputTextModule } from 'primeng/inputtext';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChipsModule } from 'primeng/chips';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { SliderModule } from 'primeng/slider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SignUpComponent } from './sign-up/sign-up.component';
import {  TooltipModule } from 'primeng/tooltip';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { LoginComponent } from './login/login.component';
import { StepsModule } from 'primeng/steps';
import { SearchMarketComponent } from './search-market/search-market.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { FieldsetModule } from 'primeng/fieldset';
import { ViewShowroomComponent } from './view-showroom/view-showroom.component';
import { ViewDetailedInventoryComponent } from './view-detailed-inventory/view-detailed-inventory.component';







@NgModule({
  declarations: [
    VehicleTypeComponent,
    AddInventoryFormComponent,
    VehicleTypeAttributesComponent,
    DashboardComponent,
    SignUpComponent,
    PageNotFoundComponent,
    AccessDeniedComponent,
    LoginComponent,
    SearchMarketComponent,
    ManageEmployeeComponent,
    ViewShowroomComponent,
    ViewDetailedInventoryComponent,
 
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
    InputTextareaModule,
    FileUploadModule,
    SliderModule,
    ConfirmDialogModule,
    TooltipModule,
    StepsModule,
    FieldsetModule,

   
   
    
    
    
    
  
    
   
  ],

  providers: [],

  
})
export class CdmsModule { }
