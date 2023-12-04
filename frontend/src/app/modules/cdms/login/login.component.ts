import { Component, OnInit, ViewChild } from '@angular/core';
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
     ) { }

 

    

    onLogin()
    {
      if(this.loginForm.valid)
      {
        if(this.rememberMeChecked)
        {
          localStorage.setItem('userData', JSON.stringify(this.userData));
        }
        else{
          localStorage.removeItem('userData')
        }
        console.log("-----------------------")
        // localStorage.clear();
        this.apiService.post('/auth/login',this.userData).subscribe({
          next: (response) => {
            // console.log(this.userData);
          const jwtToken = response.accessToken;
          const showroomId = response.showroom;
          localStorage.setItem('jwtToken', jwtToken);
          localStorage.setItem('Showroom Id', showroomId);
          this.toast.showSuccess('WELCOME');

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

   
  
    


}
