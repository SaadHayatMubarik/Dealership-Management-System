import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './shared/layout/app.layout.component';
import { CdmsModule } from './modules/cdms/cdms.module';
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
