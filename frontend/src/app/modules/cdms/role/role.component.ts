
// import { Component, OnInit, ViewChild } from '@angular/core';
// import { BaseComponent } from 'src/app/shared/base.component';
// import { ModulePermission, RolePermission } from '../../interfaces/permission';

// import {
//   DataTableColumn,
//   IDataTableAction,
//   IObject,
// } from 'src/app/shared/interfaces/common';
// import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
// import { ToastService } from 'src/app/shared/services/toast.service';

// import { NgForm } from '@angular/forms';


// @Component({
//   selector: 'app-role',
//   templateUrl: './role.component.html',
//   styleUrls: ['./role.component.scss']
// })
// export class RoleComponent extends BaseComponent implements OnInit {

//   roleName: string = '';
//   columns: DataTableColumn[] = [];
//   actions: IDataTableAction[] = [];
//   data: IObject[] = [];

//   components: any[] = [];

//   ngOnInit() {
//     this.getComponents();

//   }
  
//   modules: { name: string }[] = [];
//   rolePermissions: { [moduleName: string]: ModulePermission } = {};
  

//   getComponents() {
//     this.apiService.get(`/role-based/permissionAndComponent`).subscribe((data) => {
//       this.components = data;
//       this.modules = this.components.map(component => ({ name: component.component.component_name }));
//       this.rolePermissions = {};
//       this.modules.forEach(module => {
//         this.rolePermissions[module.name] = {
//           ADD: false,
//           DELETE: false,
//           UPDATE: false,
//           VIEW: false
//         };
//       });
//     });

//   }

//   constructor(private readonly apiService: ApiHelperService,
//     private toast: ToastService){
//     super()

//     this.modules.forEach(module => {
//       this.rolePermissions[module.name] = {
//           ADD: false,
//           DELETE: false,
//           UPDATE: false,
//           VIEW: false
//       };
//   });
//   } 


//   saveRolePermissions(){
//     const rolePermissionsData: RolePermission[] = [];
   
//     this.components.forEach((component) => {
//       const permissions: ModulePermission = this.rolePermissions[
//         component.component.component_name
//       ];
//       const rolePermissionData: RolePermission = {
//         roleName: this.roleName,
//         component_id: component.component.id, // Assuming component has an ID property
//         permissions: permissions,
//       };
//       rolePermissionsData.push(rolePermissionData);
//     });

//     this.apiService
//     .post('/role-based/saveRolePermissions', rolePermissionsData)
//     .subscribe(
//       (response) => {
//         // Handle success response
//         console.log('Role permissions saved successfully:', response);
//         console.log('OBJECT:', rolePermissionsData);
//         // Optionally, display a success message using toast service
//         this.toast.showSuccess('Role permissions saved successfully');
//       },
//       (error) => {
//         // Handle error response
//         console.error('Error saving role permissions:', error);
//         console.log('OBJECT:', rolePermissionsData);
//         // Optionally, display an error message using toast service
//         this.toast.showError('Error saving role permissions');
//       }
//     );

//   }

// }




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
  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];
  components: any[] = [];

  constructor(
    private readonly apiService: ApiHelperService,
    private toast: ToastService
  ){
    super();
  } 
  
  ngOnInit() {
    this.getComponents();
  }
 
  
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



  // saveRolePermissions() {
  //   const rolePermissionsData: RolePermission[] = [];
  //   const roleName = this.roleName; // Store role name once
   
    // Object.keys(this.rolePermissions).forEach(moduleName => {
    //   const permissions: ModulePermission = this.rolePermissions[moduleName];
    //   const rolePermissionData: RolePermission = {
    //     roleName: roleName,
    //     component_id: this.components.find(component => component.component.component_name === moduleName)?.component.component_id,
    //     permissions: permissions,
    //   };
    //   rolePermissionsData.push(rolePermissionData);
    // });

    
  // Object.keys(this.rolePermissions).forEach(moduleName => {
  //   const permissions: ModulePermission = this.rolePermissions[moduleName];
  //   const component_id = this.components.find(component => component.component.component_name === moduleName)?.component.component_id;
  //   if (component_id !== undefined) { // Ensure component_id is found
  //     const rolePermissionData: RolePermission = {
  //       roleName: roleName, // Include role name once
  //       component_id: component_id,
  //       permissions: permissions,
  //     };
  //     rolePermissionsData.push(rolePermissionData);
  //   }
  // });

  //   this.apiService
  //     .post('/role-based/saveRolePermissions', rolePermissionsData)
  //     .subscribe(
  //       (response) => {
  //         console.log('Role permissions saved successfully:', response);
  //         console.log('OBJ',rolePermissionsData)
  //         this.toast.showSuccess('Role permissions saved successfully');
  //       },
  //       (error) => {
  //         console.error('Error saving role permissions:', error);
  //         console.log('OBJ',rolePermissionsData)
  //         this.toast.showError('Error saving role permissions');
  //       }
  //     );
  // }

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
      if (component_id !== undefined) { // Ensure component_id is found
        rolePermissionsData.modulePermissions.push({ component_id: component_id, permissions: permissions });
      }
    });
    
  
    this.apiService
      .post('/role-based/addRolePermission', rolePermissionsData)
      .subscribe(
        (response) => {
          console.log('Role permissions saved successfully:', response);
          console.log('OBJ', rolePermissionsData);
          this.toast.showSuccess('Role permissions saved successfully');  
        },
        (error) => {
          console.error('Error saving role permissions:', error);
          console.log('OBJ', rolePermissionsData);
          this.toast.showError('Error saving role permissions');
        }
      );

  }
  
}
