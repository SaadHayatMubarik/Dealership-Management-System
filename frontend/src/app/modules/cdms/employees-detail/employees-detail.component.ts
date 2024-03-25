import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';


import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { NgForm } from '@angular/forms';
import { IEmployee } from '../../interfaces';

@Component({
  selector: 'app-employees-detail',
  templateUrl: './employees-detail.component.html',
  styleUrls: ['./employees-detail.component.scss']
})
export class EmployeesDetailComponent extends BaseComponent implements OnInit {

  columns: DataTableColumn[]= [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];

  status : any[] = ['Active', 'Inactive']
  performanceArr : any[] = ['Good', 'Average', 'Bad']


  employee : IEmployee = 
  { 
    employeeName : '',
    employeeCnic: '',
    employeePosition: '',
    employeeStatus: '',
    employeePhoneNo: '',
    employeeEmail: '',
    employeeSalary:0,
    joiningDate: new Date(),
    terminationDate: new Date(),
    shiftTime: '',
    bonus: 0,
    totalLeaves:0,
    availableLeaves:0,
    performance:'',

  }

  constructor(private apiService : ApiHelperService, private toast : ToastService )
  {
    super();
  }

  ngOnInit() {

    this.getEmployee();

    this.columns=[
      {
        field: 'name',
        fieldTitle: 'Employee Name',
      },
      {
        field: 'cnic',
        fieldTitle: 'Cnic'
      },
      {
        field: 'phoneNo',
        fieldTitle: 'Phone Number'
      },
      {
        field: 'email',
        fieldTitle: 'Email'
  
      },
      {
        field: 'address',
        fieldTitle: 'Address'
      },
      {
        field: 'city',
        fieldTitle: 'City'
  
      }
     ];
     this.actions = [
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: (event) => {
        
        },
      },
      {
        label: 'Update',
        icon: 'pi pi-pencil',
        command: (event) => {
       
  
        },
      }
     ];

  }
  @ViewChild('employee') EmployeeForm!: NgForm;

 

  

  validateAlphabeticInput(event: KeyboardEvent) {
    // Get the character being typed
    const char = event.key;
  
    // Allow alphabetic characters (letters), spaces, and navigation keys (e.g., backspace, delete)
    if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === ' ') && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.code)) {
        event.preventDefault();
    }
  }

  validateNumericInput(event: KeyboardEvent) {
    // Get the character being typed
    const char = event.key;

    // Allow only numbers (0-9) and navigation keys (e.g., backspace, delete)
    if (!(char >= '0' && char <= '9') && !['Backspace', 'Delete',].includes(event.code)) {
        event.preventDefault();
    }
}


getEmployee(){
  this.apiService.get(``).subscribe((data) => {
    this.data = data;
    console.log(this.data);
  });
}


  onSubmit(){

    
      this.apiService
      .post('', this.employee)
      .subscribe({
        next: (response) => {
          console.log(this.employee);
          console.log(response);
          this.closeModal();
          this.toast.showSuccess('New Employee Added.');
          this.getEmployee();
         
        },
        error: () => {
          this.toast.showError();
          console.log('Error:', this.employee);
        },
      });
    
  
  
  }


}
