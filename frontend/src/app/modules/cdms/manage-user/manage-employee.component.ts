import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';
import { IUser } from '../../interfaces';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { ToastService } from 'src/app/shared/services/toast.service';

import { NgForm } from '@angular/forms';
import { IUpdateUser } from '../../interfaces/update';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.scss'],
})
export class ManageEmployeeComponent extends BaseComponent implements OnInit {
  update_user: IUpdateUser = {
    user_id: 0,
    user_name: '',
    email: '',
    role: '',
  };

  user: IUser = {
    username: '',
    email: '',
    password: '',
    role: '',
    showroomId: localStorage.getItem('Showroom Id'),
  };

  // roles : string[] = ['ADMIN', 'SALES EMPLOYEE','INVENTORY EMPLOYEE'];

  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];
  userId: number = 0;
  userName: string = '';

  updateSidebarVisible: boolean = false;

  @ViewChild('userForm') userForm!: NgForm;
  @ViewChild('updateUser') updateUser!: NgForm;

  constructor(
    private apiService: ApiHelperService,
    private toast: ToastService,
    private httpClient: HttpClient
  ) {
    super();
  }

  ngOnInit() {
    this.getemployee();
    this.getRole();

    this.columns = [
      {
        field: 'username',
        fieldTitle: 'User Name',
      },
      {
        field: 'email',
        fieldTitle: 'Email',
      },
      {
        field: 'role',
        fieldTitle: 'Role',
      },
    ];

    this.actions = [
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: (event) => {
          this.userId = event.userId;
          this.userName = event.username;
          this.apiService.delete(`/auth/deleteUser/${this.userId}`).subscribe({
            next: (response) => {
              this.getemployee();
              this.toast.showSuccess(`${this.userName} record deleted.`);
            },
            error: () => {
              this.toast.showError('System Error');
            },
          });
        },
      },
      {
        label: 'Update',
        icon: 'pi pi-pencil',
        command: (event) => {
          this.userId = event.userId;
          this.updateSidebarVisible = true;
          this.getUserById(this.userId);
        },
      },
    ];
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.apiService.post('/auth/createUser', this.user).subscribe({
        next: (response) => {
          console.log(this.user);
          console.log(response);
          this.closeModal();
          this.toast.showSuccess('New User.');
          this.getemployee();
        },
        error: () => {
          this.toast.showError();
          console.log(this.user);
        },
      });
    } else {
      this.toast.showError('Please fill all the fields correctly.');
    }
  }

  getemployee() {
    this.apiService
      .get(`/auth/getUsers/${this.user.showroomId}`)
      .subscribe((data) => {
        this.data = data;
      });
  }

  getUserById(userId: number) {
    this.apiService
      .get(`/auth/getUser/${userId}`)
      .subscribe((data: IUpdateUser) => {
        this.update_user = data;
        console.log('update user', this.update_user);
      });
  }

  update() {
    this.apiService.put('/auth/updateUserDetails', this.update_user).subscribe({
      next: (response) => {
        this.toast.showSuccess('User information updated.');
        this.updateSidebarVisible = false;
        this.getemployee();
      },
      error: () => {
        this.toast.showError('Server Error! Please try again later.');
      },
    });
  }

  roles: any[] = [];

  getRole() {
    this.apiService
      .get(`/role-based/getRole/${this.user.showroomId}`)
      .subscribe((data) => {
        this.roles = data;
      });
  }

  // update() {
  //   if (this.updateUser.valid) {
  //     this.httpClient.patch('/auth/updateUserDetails', this.userById).subscribe({
  //       next: (response) => {
  //         this.toast.showSuccess('User information updated.');
  //         this.updateSidebarVisible = false;
  //         this.getemployee();
  //       },
  //       error: () => {
  //         this.toast.showError('Server Error! Please try again later.');
  //       },
  //     });
  //   } else {
  //     this.toast.showError('Please fill all the fields correctly');
  //   }
  // }
}
