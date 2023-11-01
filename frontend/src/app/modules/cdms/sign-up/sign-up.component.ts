import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {  NgForm } from '@angular/forms';

import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import {  MessageService } from 'primeng/api';
import { ISignUp } from '../../interfaces';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent  {

  userRoles: any[] = ["ADMIN"];
 
  
 
  createUser: ISignUp = {
    username: '',
    password:'',
    email: '',
    role: ''
  };

  @ViewChild ('f') signupForm!:NgForm;

  constructor(private router: Router, 
    private readonly apiService: ApiHelperService, 
    private message:MessageService, 
    private toast:ToastService) 
    {

    }
  


  onSubmit()
  {
    if(this.signupForm.valid && this.signupForm.value.password === this.signupForm.value.confirmPassword)
    {
      this.apiService.post('/auth/signUp',this.createUser).subscribe({
        next: (response) => {
         this.toast.showSuccess('User Created');
         setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
         this.signupForm.resetForm();
        },
        error: () => {
          this.toast.showError();
         setTimeout(() => {
          this.router.navigate(['/not-found']);
        }, 2000);
        },
      });
    }
   
    else if(this.signupForm.value.password !== this.signupForm.value.confirmPassword)
    this.toast.showInfo('Password Mismatched, Confirm Password Again.');
  }


  login(){
   this.apiService.post('/auth/signUp',this.createUser)
        .subscribe({
          next: (response) => {
           console.log("posted");
           this.router.navigate(['/login']);
          },
          error: () => {
            console.log("error");
          },
       
        });
    }


  }



 


