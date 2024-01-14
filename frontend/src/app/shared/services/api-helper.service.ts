import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class ApiHelperService {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly toastService: ToastService
  ) {

  }

  private addTokenHeader(): HttpHeaders {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      return new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    }
    return new HttpHeaders();
  }



  private getRequestOptions(params: HttpParams = new HttpParams()): { headers: HttpHeaders; params: HttpParams } {
    return {
      headers: this.addTokenHeader(),
      params: params
    };
  }




  // one more layer of security can be added by encrypting request and decrypting response (weak layer)
  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}${path}`, { params, headers: this.addTokenHeader() })
    .pipe(this.hookResponse(this));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(`${environment.apiUrl}${path}`, body, { headers: this.addTokenHeader() })
      .pipe(this.hookResponse(this));

  }

  post(path: string, body: Object = {}): Observable<any> {
    // console.log(body);
    const headers = this.addTokenHeader();
    // console.log(headers);
    return this.http
      .post(`${environment.apiUrl}${path}`, body, { headers })
      .pipe(this.hookResponse(this));
  }

  postLogin(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}${path}`, body)
      .pipe(this.hookResponse(this));
  }

  delete(path: string): Observable<any> {
    return this.http
      .delete(`${environment.apiUrl}${path}`, { headers: this.addTokenHeader() })
      .pipe(this.hookResponse(this));
  }









  // hookResponse(_this: this) {
  //   return (a: any) => {
  //     return catchError((b: any) => {
  //       if ([404, 500, 501, 400].indexOf(b.status) >=0 ) {
  //         _this.toastService.showError(b.message);
  //       } else if (b.status == 401) {
  //         // AuthService.destroy();
  //         // JwtService.destroy();
  //         // this.router.navigate(['/', 'auth', 'login']);
  //       }
  //       return a;
  //     })(a);
  //   };
  // }

  hookResponse(_this: this) {
    return (a: any) => {
      return catchError((b: any) => {
        console.log(b.status);

        switch (b.status) {
          case 404:
            this.router.navigate(['/', 'error-500']); // for time being 
            break;
          case 500:
            this.router.navigate(['/', 'error-500']); // for time being 
            break;
          case 0:
            this.router.navigate(['/', 'error-500']); // for time being 
            break;
          case 401:
            // localStorage.removeItem('jwtToken');
            localStorage.clear();
            this.router.navigate(['/login']);
            break;
        }
        return a;
      })(a);
    };
  }

  private vehicleTypes: any[] = [];





}
