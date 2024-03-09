import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleTypeComponent } from './vehicle-type/vehicle-type.component';
import { AddInventoryFormComponent } from './add-inventory-form/add-inventory-form.component';
import { VehicleTypeAttributesComponent } from './vehicle-type-attributes/vehicle-type-attributes.component';
import { LoginLayoutComponent } from 'src/app/shared/layout/login-layout/login-layout.component';
import { LoginComponent } from './login/login.component';
import { AppLayoutComponent } from 'src/app/shared/layout/app.layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { SearchMarketComponent } from './search-market/search-market.component';
import { ManageEmployeeComponent } from './manage-user/manage-employee.component';
import { IsAuthGuard } from 'src/app/shared/guard/auth.guard';
import { ViewShowroomComponent } from './view-showroom/view-showroom.component';
import { ViewDetailedInventoryComponent } from './view-detailed-inventory/view-detailed-inventory.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NotificationComponent } from './notification/notification.component';
import { ManageInvestorsComponent } from './manage-investors/manage-investors.component'; 
import { ManageCustomerComponent } from './manage-customer/manage-customer.component';
import { SellInventoryComponent } from './sell-inventory/sell-inventory.component'; 



const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent, // Use the new layout component for login
    children: [
      {
        path: '',
        component: SignUpComponent,
      },
      {
        path: 'login',
        component: LoginComponent, 
      },
      {
        path:'not-found',
        component: PageNotFoundComponent
      },
      {
        path:'access-denied',
        component: AccessDeniedComponent
      },
      
    
  
    ],
  },
  {
    path: '',
    component: AppLayoutComponent,
     // Use the new layout component for login
    children: [
      {
        path: 'dashboard',
        component:DashboardComponent,
        // canActivate: [IsAuthGuard]
        
      }
      ,{
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
    },
    {
      path:'market-search', 
      component:SearchMarketComponent,
     
    },
    {
      path:'manage-employee',
      component: ManageEmployeeComponent
    },
    {
      path:'view-showroom',
      component: ViewShowroomComponent,
      
    },
    {
      path:'detail-view/:inventoryId',
      component: ViewDetailedInventoryComponent,
    },
    {
      path:'change-password',
      component: ChangePasswordComponent,
    },
    {
      path:'notification',
      component: NotificationComponent,
    },
    {
      path:'investors',
      component: ManageInvestorsComponent,
    },
    {
      path: 'customers', 
      component: ManageCustomerComponent
    },
    {
      path: 'sell-inventory', 
      component: SellInventoryComponent
    },
    



    ],
  }, 
  // {
 
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CdmsRoutingModule { }
