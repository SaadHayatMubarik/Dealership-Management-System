import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';

// import { ActivatedRouteSnapshot, CanActivateChildFn, RouterState, RouterStateSnapshot } from "@angular/router";


export function authGuard(): boolean {
    const authService = inject(AuthService);
    const router = inject(Router);
  
    if (authService.isLoggedIn()) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  }

// @Injectable({
//     providedIn: 'root'
// })

// export class AuthGuard  {
    // constructor(private router: Router)
    // {}
    // canActivate( 
        
    //     route: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot) : boolean{  
        
    //         return true; // User has the required role, allow access
    //       } 
            
        //   }
  



// export const IsAuthGuard: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean => { 
//     return inject(AuthGuard).canActivate(route, state);
// }



