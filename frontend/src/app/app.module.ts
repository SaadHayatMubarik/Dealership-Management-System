import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppLayoutModule } from './shared/layout/app.layout.module';
import { CdmsModule } from './modules/cdms/cdms.module';
import { AppSharedModule } from './shared/app.shared.module';




@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppLayoutModule,
    AppSharedModule,
    CdmsModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
