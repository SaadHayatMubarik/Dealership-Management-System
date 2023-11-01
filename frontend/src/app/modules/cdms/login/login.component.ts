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
    private router: Router, 
    private toast: ToastService) { }

    
    


}
