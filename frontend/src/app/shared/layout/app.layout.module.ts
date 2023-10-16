import { NgModule } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { AppConfigModule } from './config/config.module';
import { AppLayoutComponent } from "./app.layout.component";
import { AppTopBarComponent } from './header/app.topbar.component';
import { AppFooterComponent } from './footer/app.footer.component';
import { AppMenuComponent } from './sidebar/app.menu.component';
import { AppSidebarComponent } from './sidebar/app.sidebar.component';
import { CommonModule } from '@angular/common';
import { AppMenuitemComponent } from './sidebar/app.menuitem.component';

@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutComponent,
    ],
    imports: [
        CommonModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        RouterModule,
        AppConfigModule
    ],
    exports: [AppLayoutComponent]
})
export class AppLayoutModule { }
