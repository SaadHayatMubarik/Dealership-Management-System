import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";

import { ActivatedRouteSnapshot, CanActivateChildFn, RouterState, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard  {

   



    canActivate( route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) : boolean{  
    return true;
}
}

export const IsAuthGuard: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean => { 

    

    return inject(AuthGuard).canActivate(route, state);
}



