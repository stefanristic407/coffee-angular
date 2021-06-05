import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@services';

@Injectable()
export class AuthGuard implements CanActivate {
    projectId;
    constructor(private router: Router, private authService: AuthService) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isAuthenticated) {
            return true;
        } else {
            localStorage.setItem('redirectUrl', state.url);
            this.router.navigateByUrl('/gate');
            return false;
        }
    }
}
