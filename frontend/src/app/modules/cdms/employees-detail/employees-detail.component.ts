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
  showroomId : any = localStorage.getItem('Showroom Id'); 

  employeeId:any='';

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
    showroomId: +this.showroomId

  }
 


  constructor(private apiService : ApiHelperService, private toast : ToastService )
  {
    super();
  }

  ngOnInit() {

    this.getEmployee();

    this.columns=[
      {
        field: 'employee_name',
        fieldTitle: 'Employee Name',
      },
      {
        field: 'employee_cnic',
        fieldTitle: 'Cnic'
      },
      {
        field: 'employee_phone_no',
        fieldTitle: 'Phone Number'
      },
      {
        field: 'employee_email',
        fieldTitle: 'Email'
  
      },
      {
        field: 'joining_date',
        fieldTitle: 'Joining Date'
      },
      {
        field: 'shift_time',
        fieldTitle: 'Shift Time'
  
      }
     ];
     this.actions = [
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: (event) => {
          this.employeeId = event.employee_id 
          console.log('EMPLOYEE ID', this.employeeId);
          this.apiService.delete(`/employee/deleteEmployee/${this.employeeId}`).subscribe({
            next: (response) => {
              this.toast.showSuccess(`Employee Name: ${event.employee_name} record deleted.`);   
              this.getEmployee();
            },
            error: () => 
            {
              this.toast.showError('Cant delete Employee Record due to an error. Contact System Admin.');
              this.getEmployee();
            }
          } 
            );
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
  this.apiService.get(`/employee/getAllEmployees/${this.showroomId}`).subscribe((data) => {
    this.data = data;
    console.log('employee data:', this.data);
  });
}


  onSubmit(){
      this.apiService
      .post('/employee/addEmployee', this.employee)
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
