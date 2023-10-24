import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { VehicleTypeDto } from '../../../../../backend/src/modules/vehicle-type/vehicle-type.dto'
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

  // one more layer of security can be added by encrypting request and decrypting response (weak layer)
  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}${path}`, { params })
      .pipe(this.hookResponse(this));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(`${environment.apiUrl}${path}`, body)
      .pipe(this.hookResponse(this));

  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}${path}`, body)
      .pipe(this.hookResponse(this));
  }

  delete(path: any): Observable<any> {
    return this.http
      .delete(`${environment.apiUrl}${path}`)
      .pipe(this.hookResponse(this));
  }

  deleteVehicleType(path: string, deleteVehicleTypeDto: VehicleTypeDto): Observable<any> {
    return this.http
      .request('delete', `${environment.apiUrl}${path}`, { body: deleteVehicleTypeDto })
      .pipe(this.hookResponse(this));
  }

  hookResponse(_this: this) {
    return (a: any) => {
      return catchError((b: any) => {
        if ([404, 500, 501, 400].indexOf(b.status) >=0 ) {
          _this.toastService.showError(b.message);
        } else if (b.status == 401) {
          // AuthService.destroy();
          // JwtService.destroy();
          // this.router.navigate(['/', 'auth', 'login']);
        }
        return a;
      })(a);
    };
  }

  private vehicleTypes: any[] = [];

setVehicleTypes(data: any) {
  this.vehicleTypes = data;
}

getVehicleTypes() {
  return this.vehicleTypes;
}

}
