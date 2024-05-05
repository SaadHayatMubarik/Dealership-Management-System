
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { ModulePermission } from '../../interfaces/permission';

import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';
import { IUser } from '../../interfaces';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { ToastService } from 'src/app/shared/services/toast.service';

import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent extends BaseComponent implements OnInit {

  roleName: string = '';
  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];

  components: any[] = [];

//   modules: { name: string }[] = [
//     { name: 'Inventory' },
//     { name: 'Manage Users' },
//     { name: 'Investors' },
//     { name: 'Customers' },
//     { name: 'View Market Inventory' },
//     { name: 'View Showrooms' },
//     // Add more modules as needed
// ];
// rolePermissions: { [moduleName: string]: ModulePermission } = {};


  ngOnInit() {
    this.getComponents();

  }
  
  modules: { name: string }[] = [];
  rolePermissions: { [moduleName: string]: ModulePermission } = {};

  getComponents() {
    this.apiService.get(`/role-based/permissionAndComponent`).subscribe((data) => {
      this.components = data;
      this.modules = this.components.map(component => ({ name: component.component.component_name }));
      console.log('this.modules', this.modules);
      this.rolePermissions = {};
      this.modules.forEach(module => {
        this.rolePermissions[module.name] = {
          add: false,
          delete: false,
          update: false,
          view: false
        };
      });
      console.log(this.modules);
    });

  
  }

  constructor(private readonly apiService: ApiHelperService,
    private toast: ToastService){
    super()

    this.modules.forEach(module => {
      this.rolePermissions[module.name] = {
          add: false,
          delete: false,
          update: false,
          view: false
      };
  });
  } 

}
