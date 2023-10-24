import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  constructor(private router: Router) { }


login(){
  console.log("aljsbdas");
  this.router.navigate(['/dashboard']);
 
}
}
