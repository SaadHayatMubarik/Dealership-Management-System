import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { ISignUp } from '../../interfaces';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  userRoles: any[] = ["ADMIN"];
  selectedUserRole: string = '';
  userName:string = '';
  password:string = '';
  email:string = '';

 
  createUser: ISignUp = {
    username: '',
    password:'',
    email: '',
    role: ''
  };



  constructor(private router: Router, private readonly apiService: ApiHelperService) { }
  



  // userNameValidation(){
  //   if(this.userName.length > 4 && this.userName.length < 20)
  //   {
  //     this.login();
  //   }
  //   else{
  //     console.log("invalid username")
  //   }
  // }
  // passwordValidation(){
    
  // }
  
  
  // emailValidation(){}
  // confirmPasswordValidation()
  // {

  // }
  
  
  login(){
   this.apiService.post('/auth/signUp')
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



 


