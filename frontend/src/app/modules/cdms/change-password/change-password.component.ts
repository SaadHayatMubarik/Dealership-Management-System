import { Component } from '@angular/core';
import { IChangePassword } from '../../interfaces';
import { Router } from '@angular/router';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  checkPassword: string = '';

  change_Password:IChangePassword = 
  {
    oldPassword:'',
    newPassword:'',
  }
  constructor(private router: Router) { }

  resetFields() {
   
    this.checkPassword = '';
    this.change_Password.oldPassword = '';
    this.change_Password.newPassword = '';
  
   
  }


  changePassword(){

    if (this.checkPassword === this.change_Password.newPassword) {
      console.log("smatch");
      this.router.navigate(['/dashboard']);
    }
    else  {
      console.log("mimatch");
      
    }

  }
}
