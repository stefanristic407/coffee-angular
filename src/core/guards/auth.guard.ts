import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@services';

@Injectable()
export class AuthGuard implements CanActivate {
    projectId;
    constructor(private authService: AuthService) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isAuthenticated) {
            return true;
        } else {
            this.authService.goToLogin(state.url);
            return false;
        }
    }
}
