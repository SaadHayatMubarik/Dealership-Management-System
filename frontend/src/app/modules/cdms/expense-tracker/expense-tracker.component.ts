import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { IExpense } from '../../interfaces/index';

import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { ToastService } from 'src/app/shared/services/toast.service';

import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-expense-tracker',
  templateUrl: './expense-tracker.component.html',
  styleUrls: ['./expense-tracker.component.scss']
})
export class ExpenseTrackerComponent extends BaseComponent {

  expense: IExpense = {
    expense_name: '',
    expense_amount:0,
    date:'', 
    description:'',
    showroomId: localStorage.getItem("Showroom Id") || '',
  };


  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];

  @ViewChild('expenses') expenseForm!: NgForm;
  display: boolean = false;
  expense_id: number = 0;

  showDialog() {
    this.display = true;
  }
  
  constructor(
    private readonly apiService: ApiHelperService,
    private toast: ToastService,
    private authService: AuthService
  ){
   super()
  } 

  ngOnInit() {
    this.columns = [
      {
        field: 'expense_name',
        fieldTitle: 'Name',
      },
      {
        field: 'expense_amount',
        fieldTitle: 'Amount',
      },
      {
        field: 'date',
        fieldTitle: 'Date',
      },
      ];

      this.actions = [
        {
          label: 'Update',
          icon: 'pi pi-file-edit',
          command: (event) => {

          },
          permission: 'update.expense'
        },
        {
          label: 'Delete',
          icon: 'pi pi-file-edit',
          command: (event) => {
            this.expense_id = event.expense_id;
            this.apiService.delete(`/auth/deleteUser/`).subscribe({
              next: (response) => {
                this.getExpenses();
                this.toast.showSuccess(`Record deleted.`);
              },
              error: () => {
                this.toast.showError('System Error');
              },
              
            });
            

          },
          permission: 'delete.expense'
        },
      ]
      this.actions = this.actions.filter(action => !action.permission || this.authService.hasPermission(action.permission));
  }

 

  onSubmit(){
    console.log('expense obj', this.expense);

    if (this.expenseForm.valid){
      this.apiService
        .post('', this.expense)
        .subscribe({
          next: (response) => {
            console.log(this.expense);
            console.log(response);
            this.closeModal();
            this.getExpenses();
            this.toast.showSuccess('New vehicle type created.')
          },
          error: () => {
            this.toast.showError();
          },
        });
    }

    else{
      this.toast.showError('Please  fill out  field correctly.');
    }

  }

  getExpenses(){
    this.apiService
    .get(`/auth/getUsers/`)
    .subscribe((data) => {
      this.data = data;
    });

  }
}
