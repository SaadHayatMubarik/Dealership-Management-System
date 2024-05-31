interface Permission {
  permission_id: number;
  permission_name: string;
  action_type: string;
  role_Permission_id: number;
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Ilogin } from '../../interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';

import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import {  NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{


  rememberMeChecked:boolean = false;
  ngOnInit(){
    const rememberedMeData = localStorage.getItem('userData');
    if(rememberedMeData){
      const data = JSON.parse(rememberedMeData);
      this.rememberMeChecked = true;
    }
  }


  userData:Ilogin = 
  {
    username:'',
    password:'',
  }

  @ViewChild ('login') loginForm!:NgForm;

  constructor(private readonly apiService: ApiHelperService ,
    private router:Router, 
    private toast:ToastService,
    private auth:AuthService,
     ) { }

 

     navigateToSignUp() {
      this.router.navigate(['']); 
    }
    
  

    onLogin()
    {
      if(this.loginForm.valid)
      {
       
        this.auth.login('/auth/login',this.userData).subscribe({
          next: (response) => {
            console.log('login response', response);
          
          const jwtToken = response.accessToken;
          const showroomId = response.showroom;
          const role = response.role;
          const userId = response.userId;
         
          // const permissions = response.permissions.map((p: { permission: { permission_name: string } }) => p.permission.permission_name);
          const permissions = (response.permissions as { permission_name: string }[]).map(p => p.permission_name);

          localStorage.setItem('jwtToken', jwtToken); 
          localStorage.setItem('Showroom Id', showroomId);
          localStorage.setItem('userRole', role);
          localStorage.setItem('user Id', userId);
          // localStorage.setItem('permissions', JSON.stringify(permissions)); // Store permissions
          localStorage.setItem('permissions', JSON.stringify(permissions)); // Store permissions
          
          this.toast.showSuccess('WELCOME');
        
          // this.auth.autoLogout(36000);

           setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1000);
           this.loginForm.resetForm();
          },
          error: () => {
            this.toast.showError('Access Denied');
          },
        });
      }
    }

 

  
   

    // onLogin(){
    //   if(this.loginForm.valid){
    //     this.auth.login('/auth/login', this.userData);
    //     console.log("working")
    //   }
      
    }

