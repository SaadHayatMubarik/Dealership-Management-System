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

  showDialog() {
    this.display = true;
  }
  
  constructor(
    private readonly apiService: ApiHelperService,
    private toast: ToastService
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

  }
}
