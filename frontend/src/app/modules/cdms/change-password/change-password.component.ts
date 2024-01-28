import { Component } from '@angular/core';
import { IChangePassword } from '../../interfaces';
import { Router } from '@angular/router';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { ToastService } from 'src/app/shared/services/toast.service';

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
  constructor(private router: Router, 
   private apiService : ApiHelperService,
   private toast: ToastService
   ) { }

  resetFields() {
   
    this.checkPassword = '';
    this.change_Password.oldPassword = '';
    this.change_Password.newPassword = '';
  
   
  }


  changePassword(){
    // console.log("working")
    if (this.checkPassword === this.change_Password.newPassword && (this.change_Password.oldPassword || this.change_Password.newPassword || this.checkPassword !== ''))  {
      this.apiService.put(`/auth/changePassword/${this.change_Password.newPassword}/${this.change_Password.oldPassword}/${localStorage.getItem('user Id')}`)
      .subscribe(
         (response) => {
          this.toast.showSuccess('Password changed Successfully');
          this.router.navigate(['/dashboard']);
        }
      )
      
    }
    else  if(this.checkPassword !== this.change_Password.newPassword && (this.change_Password.oldPassword || this.change_Password.newPassword || this.checkPassword === '')){
      this.toast.showError("Password mismatch");
      
    }
    else {
      this.toast.showError();
    }

  }
}

// /auth/changePassword/{newPassword}/{oldPassword}/{userId}
// if (this.vehicleType.vehicleTypeName != '') {
//   this.apiService
//     .post('/vehicle-type/addVehicleType', this.vehicleType)
//     .subscribe({
//       next: (response) => {
//         console.log(this.vehicleType);
//         console.log(response);
//         this.closeModal();
//         this.getVehicleType();
//         this.vehicleType.vehicleTypeName = "";
//         this.toast.showSuccess('New vehicle type created.')
//       },
//       error: () => {
//         this.toast.showError();
//       },
//     });
// }