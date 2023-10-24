import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './shared/layout/app.layout.component';
import { CdmsModule } from './modules/cdms/cdms.module';
import { LoginComponent } from './modules/cdms/login/login.component';
import { LoginLayoutComponent } from './shared/layout/login-layout/login-layout.component';

const routes: Routes = [

  {
    path: 'cdms',
    loadChildren: () => CdmsModule, // Load CdmsModule with AppLayoutComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
