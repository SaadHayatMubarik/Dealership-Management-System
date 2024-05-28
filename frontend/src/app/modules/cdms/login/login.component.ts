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
    
    userId: number = 0 ;

    onLogin()
    {
      if(this.loginForm.valid)
      {
        // if(this.rememberMeChecked)
        // {
        //   localStorage.setItem('userData', JSON.stringify(this.userData));
        // }
        // else{
        //   localStorage.removeItem('userData')
        // }
        // console.log("-----------------------")
        // localStorage.clear();
        this.auth.login('/auth/login',this.userData).subscribe({
          next: (response) => {
            this.userId = response.userId;
            console.log('userId',this.userId)
          const jwtToken = response.accessToken;
          const showroomId = response.showroom;
          const role = response.role;
          const userId = response.userId;
          localStorage.setItem('jwtToken', jwtToken); 
          localStorage.setItem('Showroom Id', showroomId);
          localStorage.setItem('userRole', role);
          localStorage.setItem('user Id', userId);
          this.toast.showSuccess('WELCOME');
          this.getRole(this.userId);
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

    role: any[] = []

    getRole(userID:number){
      this.apiService.get(`/role-based/componentViaRole/${userID}`).subscribe((data) => {
        this.role = data;
        console.log('Roles', this.role);
      });

    }

   

    // onLogin(){
    //   if(this.loginForm.valid){
    //     this.auth.login('/auth/login', this.userData);
    //     console.log("working")
    //   }
      
    }

