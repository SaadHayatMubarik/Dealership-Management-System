import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Options',
                items: [
                    { label: 'Vehicle Type', 
                    icon: 'pi pi-fw  pi-truck', 
                    routerLink: ['/cdms/vehicle-type'] },
                    { label: 'Vehicle Type Attributes', 
                    icon: 'pi pi-fw  pi-car', 
                    routerLink: ['/cdms/vehicle-type-attributes'] },
                    { label: 'Add Inventory', 
                    icon: 'pi pi-fw  pi-upload', 
                    routerLink: ['/cdms/add-inventory'] },
                ],
                
                
            }
        ];
    }
}
