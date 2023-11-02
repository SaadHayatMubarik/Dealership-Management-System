import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Ilogin } from '../../interfaces';

import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import {  NgForm } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  userData:Ilogin = 
  {
    username:'',
    password:'',
  }

  @ViewChild ('login') loginForm!:NgForm;

  constructor(private readonly apiService: ApiHelperService ,
    private router:Router, 
    private toast:ToastService) { }

    onLogin()
    {
      if(this.loginForm.valid)
      {
        this.apiService.post('/auth/login',this.userData).subscribe({
          next: (response) => {
           this.toast.showSuccess('WELCOME');
           setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1000);
           this.loginForm.resetForm();
          },
          error: () => {
            this.toast.showError('Access Denied');
           setTimeout(() => {
            this.router.navigate(['/access-denied']);
          }, 2000);
          },
        });
      }
    }

   
  
    


}
