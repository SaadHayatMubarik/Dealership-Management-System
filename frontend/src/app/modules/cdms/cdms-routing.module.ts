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
// import { IsAuthGuard } from 'src/app/shared/guard/auth.guard';
import { ViewShowroomComponent } from './view-showroom/view-showroom.component';
import { ViewDetailedInventoryComponent } from './view-detailed-inventory/view-detailed-inventory.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NotificationComponent } from './notification/notification.component';
import { ManageInvestorsComponent } from './manage-investors/manage-investors.component'; 
import { ManageCustomerComponent } from './manage-customer/manage-customer.component';
import { SellInventoryComponent } from './sell-inventory/sell-inventory.component'; 
import { RoleComponent } from './role/role.component';
import { UpdateInventoryComponent } from './update-inventory/update-inventory.component';
import { EmployeesDetailComponent } from './employees-detail/employees-detail.component';
import { InvestmentsComponent } from './investments/investments.component';
import { ExpenseTrackerComponent } from './expense-tracker/expense-tracker.component';
import { ViewDocumentComponent } from './view-document/view-document.component';
import { authGuard } from 'src/app/shared/guard/auth.guard';



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
        canActivate: [authGuard]
        // canActivate: [IsAuthGuard]
        
      }
      ,{
      path: 'vehicle-type', 
      component: VehicleTypeComponent,
      canActivate: [authGuard]
    },
    {
      path:'vehicle-type-attributes', 
      component:VehicleTypeAttributesComponent, 
      canActivate: [authGuard]

    },
    {
      path:'add-inventory', 
      component:AddInventoryFormComponent,
      canActivate: [authGuard]
    },
    {
      path:'market-search', 
      component:SearchMarketComponent,
      canActivate: [authGuard]
     
    },
    {
      path:'manage-users',
      component: ManageEmployeeComponent,
      canActivate: [authGuard]
    },
    {
      path:'view-showroom',
      component: ViewShowroomComponent,
      canActivate: [authGuard]
      
    },
    {
      path:'detail-view/:inventoryId',
      component: ViewDetailedInventoryComponent,
      canActivate: [authGuard]
    },
    {
      path:'change-password',
      component: ChangePasswordComponent,
      canActivate: [authGuard]
    },
    {
      path:'notification',
      component: NotificationComponent,
      canActivate: [authGuard]
    },
    {
      path:'investors',
      component: ManageInvestorsComponent,
      canActivate: [authGuard]
    },
    {
      path: 'customers', 
      component: ManageCustomerComponent,
      canActivate: [authGuard]
    },
    {
      path: 'sell-inventory/:inventoryId', 
      component: SellInventoryComponent,
      canActivate: [authGuard]
    },
    {
      path: 'roles', 
      component:RoleComponent,
      canActivate: [authGuard]
    },
    {
      path: 'update-inventory/:inventoryId', 
      component:UpdateInventoryComponent,
      canActivate: [authGuard]
    },
    {
      path:'manage-employee',
      component:EmployeesDetailComponent,
      canActivate: [authGuard]
    },
    {
      path:'manage-investments/:investorId',
      component:InvestmentsComponent,
      canActivate: [authGuard]
    },
    {
      path:'expense',
      component:ExpenseTrackerComponent,
      canActivate: [authGuard]
    },
    {
      path: 'documents/:inventoryId', 
      component: ViewDocumentComponent,
      canActivate: [authGuard]
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
