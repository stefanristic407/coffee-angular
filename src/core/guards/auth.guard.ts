import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '@env/environment';

@Injectable()
export class AuthGuard implements CanActivate {
    projectId;
    constructor(private router: Router, private cookieService: CookieService) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.cookieService.get('Auth')) {
            return true;
        } else {
            localStorage.setItem('redirectUrl', state.url);
            this.router.navigateByUrl('/gate');
            return false;
        }
    }
}
