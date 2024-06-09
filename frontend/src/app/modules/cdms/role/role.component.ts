import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { ModulePermission, RolePermission } from '../../interfaces/permission';

import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';
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
  updateRoleName :string = ''
  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];
  components: any[] = [];
  roleId:number = 0;
  display : boolean = false;

  constructor(
    private readonly apiService: ApiHelperService,
    private toast: ToastService
  ){
    super();
  } 
  
  ngOnInit() {
    this.getComponents();
    this.getRoles();

    this.columns = [
      {
        field: 'role_id',
        fieldTitle: 'Role ID',
      },
      {
        field: 'role_name',
        fieldTitle: 'Role Name',
      },
      ];

      this.actions = [
        {
          label: 'Delete',
          icon: 'pi pi-trash',
          command: (event) => {
            this.roleId = event.role_id;
            this.deleteRole(this.roleId);
          },
          permission: 'delete.roles'
        },
        {
          label: 'Update',
          icon: 'pi pi-pencil',
          command: (event) => {
            this.roleId = event.role_id;
            this.display = true;
            
          },
          permission: 'update.roles'
        },
      ];
  }

  @ViewChild('roleForm') roleForm!: NgForm;
  @ViewChild('updatedRoleForm') roleUpdateForm!: NgForm;
 
  
  modules: { name: string }[] = [];
  rolePermissions: { [moduleName: string]: ModulePermission } = {};
  
  getComponents() {
    this.apiService.get(`/role-based/permissionAndComponent`).subscribe((data) => {
      this.components = data;
      this.modules = this.components.map(component => ({ name: component.component_name }));
      this.rolePermissions = {};
      this.modules.forEach(module => {
        this.rolePermissions[module.name] = {
          ADD: false,
          DELETE: false,
          UPDATE: false,
          VIEW: false
        };
      });
    });
  }
  showroom_id = localStorage.getItem('Showroom Id');

  saveRolePermissions() {
    const rolePermissionsData: RolePermission = {
      modulePermissions: [],
      roleName: this.roleName,
      showroomId: this.showroom_id,
      // showroomId: Number(localStorage.getItem('Showroom Id'))
    };
    Object.keys(this.rolePermissions).forEach(moduleName => {
      const permissions: ModulePermission = this.rolePermissions[moduleName];
      const component_id = this.components.find(component => component.component_name === moduleName)?.component_id;
      if (component_id !== undefined) { 
        rolePermissionsData.modulePermissions.push({ component_id: component_id, permissions: permissions });
      }
    });

    if (this.roleForm.valid){
      this.apiService
      .post('/role-based/addRolePermission', rolePermissionsData)
      .subscribe(
        (response) => {
          this.toast.showSuccess('Role permissions saved successfully');  
          this.closeModal();
          this.getRoles();
        },
        (error) => {
          this.toast.showError('Error saving role permissions');
        }
      );
    }

    else if (!this.roleForm.valid){
      this.toast.showError('Please fill the role name field.')
    }
  }


  

  getRoles(){
    this.apiService.get(`/role-based/getRole/${this.showroom_id}`).subscribe((data) => {
      this.data = data;
    });
}

deleteRole(roleId:number){
  this.apiService.delete(`/role-based/deleteRole/${roleId}`).subscribe({
    next: (response) => {
      this.getRoles();
      this.toast.showSuccess(`${this.roleName} record deleted.`);
    },
    error: () => {
      this.toast.showError('System Error.');
    },
    
  });
}

updateRole(){
  if (this.roleUpdateForm.valid){
    this.apiService.patch(`/role-based/updateRole/${this.roleId}/${this.updateRoleName}`).subscribe({
      next: (response) => {
        this.getRoles();
        this.toast.showSuccess(`Role Name Update.`);
        this.display = false;
        this.roleUpdateForm.reset();

      },
      error: () => {
        this.toast.showError('System Error');
      },
    });
  }
  else{
    this.toast.showError('Please fill the field correctly')
  }

}


}
