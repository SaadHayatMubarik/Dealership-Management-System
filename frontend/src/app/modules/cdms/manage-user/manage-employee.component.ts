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

  roles : string[] = ['ADMIN', 'SALES EMPLOYEE','INVENTORY EMPLOYEE'];
  

  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];
  userId : number = 0;
  userName : string = '';

  @ViewChild ('userForm') userForm!:NgForm;

  constructor(private apiService : ApiHelperService, private toast : ToastService )
  {
    super();
  }

  ngOnInit() {

    this.getemployee();

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
        label: ' Delete',
        icon: 'pi pi-trash',
        command: (event) => {
         this.userId = event.userId;
         this.userName = event.username
         this.apiService.delete(`/auth/deleteUser/${this.userId}`).subscribe({
           next: (response) => {
             this. getemployee();
             this.toast.showSuccess(`${this.userName} record deleted.`);   
           },
           error: () => 
           {
             this.toast.showError('System Error');
           }
         }
           );

        },
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
            this.toast.showSuccess('New User.');
            this.getemployee();
          },
          error: () => {
            this.toast.showError();
            console.log(this.user);
          },
        });
    }
  }

  getemployee(){
    this.apiService.get(`/auth/getUsers/${this.user.showroomId}`).subscribe((data) => {
      this.data = data;
    });
  }

}