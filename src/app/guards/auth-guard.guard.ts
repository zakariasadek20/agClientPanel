import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private afAuth:AngularFireAuth,private router:Router){}
  canActivate(): Observable<boolean> {
   return this.afAuth.authState.pipe(map(auth=>{
      if(!auth){
        this.router.navigate(['/login'])
        return false;
      }else{
        return true
      }
    }))
    
  }
}
