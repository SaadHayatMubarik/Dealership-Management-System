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
import { Locale } from 'moment';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.scss']
})
export class ManageEmployeeComponent extends BaseComponent implements OnInit {


  user: IUser = {
    user_name: '',
    email: '',
    password:'',
    role:'',
    showroomid: localStorage.getItem('Showroom Id'),

  };

  roles : string[] = ['admin', 'Inventory-Manager', 'Accounts-Manager'];
  

  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];

  @ViewChild ('userForm') userForm!:NgForm;

  constructor(private apiService : ApiHelperService, private toast : ToastService )
  {
    super();
  }

  ngOnInit() {

    this.columns = [
      {
        field: '',
        fieldTitle: 'User Name',
      },
      {
        field: '',
        fieldTitle: 'Email',
      },
      {
        field: '',
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


}
