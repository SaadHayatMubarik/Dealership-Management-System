import { Injectable } from '@angular/core';

@Injectable()
export class LocalstorageService {
  getItem(key: string): string | null {
    return window.localStorage.getItem(key);
  }

  setItem(key: string, value: string) {
    window.localStorage.setItem(key, value);
  }

  removeItem(key: string) {
    window.localStorage.removeItem(key);
  }
}
