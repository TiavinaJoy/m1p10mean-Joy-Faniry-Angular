import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

@Injectable({
   providedIn: "root",
})
export class AuthGuard implements CanActivate {

   constructor(private router: Router) {}

   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      
      const localType = localStorage.getItem('type');
      const routeType = next.data['requiredRole'];
      const token = localStorage.getItem('token');
//rhefa tss token na hoe expiré ilay token na tonga dia gerena heo rehefa expirer ny token dia supprimer ny localStorage
      if(!token) {
        this.router.navigate(["/"]); 
        return false;
      }

      if (localType === routeType) {
         return true; 
      } else {

         this.router.navigate(["/"]); 
         return false;
      }
   }
}