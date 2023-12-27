import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthService {

    private tokenExpirationTimer : any;

    constructor(private http:HttpClient,
                private apiService:ApiHelperService,
                private router: Router,){}

    
    login(path: string, body: Object = {}): Observable<any> {
        return this.http
          .post(`${environment.apiUrl}${path}`, body)
          .pipe(this.apiService.hookResponse(this.apiService));
      }

      logout(){
        this.router.navigate(['/login']);
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('Showroom Id');

        if (this.tokenExpirationTimer)
        {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
      }

      autoLogout(expirationDuration : number){

       this.tokenExpirationTimer =  setTimeout(() => {
            this.logout();
        },expirationDuration);
      }

      autoLogin(){}


}