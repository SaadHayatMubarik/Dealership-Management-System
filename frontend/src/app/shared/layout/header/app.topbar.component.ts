import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../service/app.layout.service';
import { AuthService } from '../../services/auth.service';


@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    companyName: string;



    constructor(public layoutService: LayoutService, readonly authService: AuthService) {
        this.companyName = 'CDMS';


     }
    ngOnInit(): void {
        this.companyName = 'CDMS';
    }

logout(){
    this.authService.logout();
}

changePassword(){}
}
