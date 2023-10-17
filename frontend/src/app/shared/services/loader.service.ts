import { Injectable } from '@angular/core';
import { ILoaderState } from '../interfaces/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderSubject = new BehaviorSubject<ILoaderState>({ show: false });

  loaderState$ = this.loaderSubject.asObservable();

  show(): void {
    this.loaderSubject.next(<ILoaderState>{ show: true });
  }

  hide(): void {
    this.loaderSubject.next(<ILoaderState>{ show: false });
  }
}
