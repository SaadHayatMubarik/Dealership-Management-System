import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  readonly loaderSubject = new BehaviorSubject<any>({ iheading: '' });

  loaderState$ = this.loaderSubject.asObservable();
}
