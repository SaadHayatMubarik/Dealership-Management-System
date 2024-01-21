import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";

import { ActivatedRouteSnapshot, CanActivateChildFn, RouterState, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard  {
    constructor(private router: Router)
    {}
    canActivate( 
        
        route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) : boolean{  
        
            return true; // User has the required role, allow access
          } 
            
          }
  



export const IsAuthGuard: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean => { 
    return inject(AuthGuard).canActivate(route, state);
}



