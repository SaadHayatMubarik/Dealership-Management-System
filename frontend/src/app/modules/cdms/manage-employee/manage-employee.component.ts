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


@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.scss']
})
export class ManageEmployeeComponent extends BaseComponent implements OnInit {


  user: IUser = {
    username: '',
    email: '',
    password:'',
    role:'',
    showroomId: localStorage.getItem('Showroom Id'),
  };

  roles : string[] = ['ADMIN', 'EMPLOYEE', 'OWNER'];
  

  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];

  @ViewChild ('userForm') userForm!:NgForm;

  constructor(private apiService : ApiHelperService, private toast : ToastService )
  {
    super();
  }

  ngOnInit() {

    this.getemployee();

    this.columns = [
      {
        field: 'user_id',
        fieldTitle: 'User Id',
      },
      {
        field: 'user_name',
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
        label: ' Delete',
        icon: 'pi pi-trash',
        command: () => {},
      },
      {
        label: 'Edit',
        icon: 'pi pi-file-edit',
        command: () => {},
      },
    ];

  }

  onSubmit(){
    {
      this.apiService
        .post('/auth/createUser', this.user)
        .subscribe({
          next: (response) => {
            console.log(this.user);
            console.log(response);
            this.closeModal();
            this.toast.showSuccess('New User.')
          },
          error: () => {
            this.toast.showError();
            console.log(this.user);
          },
        });
    }



  }

  getemployee(){
    this.apiService
    .get(`/auth/getUsers/${this.user.showroomId}`)
    .subscribe({
      next: (response: IObject[]) => {
       console.log(response);
       console.log('success');
      },
      error: () => {
        console.log('error');
      },
    });

  }

}
