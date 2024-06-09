import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';
import { AuthService } from 'src/app/shared/services/auth.service';


import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { NgForm } from '@angular/forms';
import { IEmployee } from '../../interfaces';
import { IUpdateEmployee } from '../../interfaces/update';

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

  update_employee : IUpdateEmployee = 
  {
    employee_name : '',
    employee_cnic: '',
    employee_position: '',
    employee_status: '',
    employee_phone_no: '',
    employee_email: '',
    employee_salary:0,
    joining_date: new Date(),
    Termination_date: new Date(),
    shift_time: '',
    bonus: 0,
    total_leaves:0,
    available_leaves:0,
    performance:'',
    showroomId: +this.showroomId

  }

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
 


  constructor(
    private apiService : ApiHelperService, 
    private toast : ToastService,
    private authService: AuthService
   )
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
        permission: 'delete.manageEmployee'
      },
      {
        label: 'Update',
        icon: 'pi pi-pencil',
        command: (event) => {
          this.employeeId = event.employee_id;
          this.showDialog();
          this.getEmployeeId(this.employeeId);
          
        },
        permission: 'update.manageEmployee'
      }
      
     ];
     this.actions = this.actions.filter(action => !action.permission || this.authService.hasPermission(action.permission));

  }
    
  @ViewChild('employee') EmployeeForm!: NgForm;
  @ViewChild('updated_employee') updated_employee!: NgForm;


  display: boolean = false;
  showDialog() {
    this.display = true;
  }

  validateAlphabeticInput(event: KeyboardEvent) {
    
    const char = event.key;
    // Allow alphabetic characters (letters), spaces, and navigation keys (e.g., backspace, delete)
    if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === ' ') && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.code)) {
        event.preventDefault();
    }
  }

  validateNumericInput(event: KeyboardEvent) {
    
    const char = event.key;
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

getEmployeeId(employeeid: number){
  this.apiService.get(`/employee/getEmployeeDetailsById/${employeeid}`).subscribe((data: IUpdateEmployee) => 
    {
      this.update_employee = data;
      console.log('data by id of employee', this.update_employee);
      console.log(this.update_employee);
      
    })
}

onUpdate(){

  if (this.updated_employee.valid){
    this.apiService.put('/employee/updateEmployee', this.update_employee).subscribe({
      next: (response) => {
        this.toast.showSuccess('User information updated.');
        this.display = false;
        this.getEmployee();
        console.log('updated_user', this.update_employee);
        this.updated_employee.reset();
      },
      error: () => {
        this.toast.showError('Server Error! Please try again later.');
        console.log('updated_user', this.update_employee);
      },
    });
  }

  else {
    this.toast.showError('Please fill the form correctly');
  }

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
