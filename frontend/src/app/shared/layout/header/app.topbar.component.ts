import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../service/app.layout.service';
import { AuthService } from '../../services/auth.service';
import { BaseComponent } from '../../base.component';
import { Router } from '@angular/router';


@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent extends BaseComponent implements OnInit {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    companyName: string;
    displayModal: boolean = false;



    constructor(public layoutService: LayoutService, 
        readonly authService: AuthService, 
        private router: Router) {
        super();
        this.companyName = 'DMS';

     }
    ngOnInit(): void {
        this.companyName = 'DMS';
    }

logout(){
    this.authService.logout();
}

redirect(){
    this.router.navigate(['change-password']);
}

toNotification(){
    this.router.navigate(['notification']);
}

}
