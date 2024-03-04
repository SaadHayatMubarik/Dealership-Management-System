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
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/cdms/dashboard'] }
                ]
            },
            {
                label: 'Manage Inventory',
                items: [
                    { label: 'Vehicle Type', 
                    icon: 'pi pi-fw  pi-truck', 
                    routerLink: ['/cdms/vehicle-type'] },
                    { label: 'Vehicle Type Attributes', 
                    icon: 'pi pi-fw  pi-car', 
                    routerLink: ['/cdms/vehicle-type-attributes'] },
                    { label: 'Inventory', 
                    icon: 'pi pi-fw  pi-upload', 
                    routerLink: ['/cdms/add-inventory'] },  
                ],
            },
            {
                label: 'Market',
                items: [
                    { label: 'Search In Market', 
                    icon: 'pi pi-fw pi-search', 
                    routerLink: ['/cdms/market-search'] },
                    { label: 'View Showrooms', 
                    icon: 'pi pi-fw pi-building', 
                    routerLink: ['/cdms/view-showroom'] },
                ]
            },
            {
                label: 'Management',
                items: [
                    { label: 'Manage Users', 
                    icon: 'pi pi-fw pi-users', 
                    routerLink: ['/cdms/manage-employee'] },
                   
                    { label: 'Manage Investors', 
                    icon: 'pi pi-fw pi-money-bill', 
                    routerLink: ['/cdms/investors'] },

                    { label: 'Manage Customers', 
                    icon: 'pi pi-fw pi-money-bill', 
                    routerLink: ['/cdms/customers'] },
                ],
                
            },
            
            
        ];
    }
}
