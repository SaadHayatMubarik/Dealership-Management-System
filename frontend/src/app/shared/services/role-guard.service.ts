// role.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requiredRole = (next.data as any)['requiredRole']; // Fix for TypeScript error
    const userRole = localStorage.getItem('userRole');

    if (requiredRole && userRole === requiredRole) {
      return true; // User has the required role, allow access
    } else {
      // Redirect to a forbidden page or handle unauthorized access
      return false;
    }
  }
}
