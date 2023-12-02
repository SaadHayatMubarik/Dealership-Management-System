import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {  NgForm } from '@angular/forms';


import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import {  MessageService } from 'primeng/api';
import { ISignUp } from '../../interfaces';


interface State {
  label: string;
  value: string;
}

interface CityList {
  label: string;
  value: string;
  
}




@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent  {

  createAdmin: ISignUp = {
    username: '',
    email: '',
    password:'',
    showroomAddress:'',
    showroomCity:'',
    showroomContactNo:'',
    showroomName:'',
    showroomState:'',

  };

  @ViewChild ('showroomForm') ShowroomForm!:NgForm;
  @ViewChild ('adminForm') AdminForm!:NgForm;
  

  constructor(private router: Router, 
    private readonly apiService: ApiHelperService, 
    private message:MessageService, 
    private toast:ToastService,) 
    {

    }
  

  states : State[] = [
    { label: 'Sindh', value: 'Sindh' },
    { label: 'Punjab', value: 'Punjab' },
    { label: 'Balochistan', value: 'Balochistan' },
    { label: 'KPK', value: 'KPK' }
  ];

  cities : CityList[] = [
    { label: 'Lahore', value: 'Lahore' },
    { label: 'Karachi', value: 'Karachi' },
    { label: 'Multan', value: 'Multan' },
    { label: 'Islamabad', value: 'Islamabad' }
  ];

  // citiesByState: CityList = {
  //   Sindh: ['Karachi', 'Hyderabad', 'Sukkur'],
  //   Punjab: ['Lahore', 'Faisalabad', 'Rawalpindi'],
  //   Balochistan: ['Quetta', 'Gwadar', 'Khuzdar'],
  //   KPK: ['Peshawar', 'Abbottabad', 'Swat']
  // };


 

  activeTabIndex = 0; // Track current active tab index
  showSecondTab = false; // Initially disable the second tab

//only number input in contact number field
  onKeyDown(event: KeyboardEvent) {
    const key = event.key;
    if (key === 'Backspace' || key === 'Delete') {
      return;
    }
    if (!/^\d*$/.test(key)) {
      event.preventDefault();
    }
  }

  //populating cities dropdown based on the state selected
  // onStateChange() {
  //   console.log(this.createAdmin.showroomState)
  //   if (this.createAdmin.showroomState in this.citiesByState) {
  //     this.cities = this.citiesByState[this.createAdmin.showroomState];
  //     console.log(this.cities)
      
  //   } else {
  //     this.cities = [];
  //   }
  // }

  //functionality when showroom form is validated and next is pressed
  onNext(){
  if(this.ShowroomForm.valid)
  {
        this.activeTabIndex = 1;
        this.showSecondTab = true;
  }

  else {
    this.toast.showError("Please fill all the fields");
  }
  }
  


  

  onSubmit()
  {
    if(this.AdminForm.valid && this.ShowroomForm.valid && this.AdminForm.value.password === this.AdminForm.value.confirmPassword)
    {
      
      this.apiService.post('/auth/signUp',this.createAdmin).subscribe({
        next: (response) => {
         this.toast.showSuccess('User Created');
         console.log(response);
         setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
        },
        error: () => {
          this.toast.showError();
        },
      });
    }
   
    else if(this.AdminForm.value.password !== this.AdminForm.value.confirmPassword)
    this.toast.showInfo('Password Mismatched, Confirm Password Again.');
    this.AdminForm.value.confirmPassword = '';
  }

  

  }



 


