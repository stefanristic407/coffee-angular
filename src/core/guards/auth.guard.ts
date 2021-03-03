import { Injectable } from '@angular/core';
import {
    Route,
    UrlSegment,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthGuard implements CanActivate {
    projectId;
    constructor(private titleService: Title, private router: Router, private cookieService: CookieService) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.cookieService.get('Auth')) {
            return true;
        } else {
            localStorage.setItem('redirectUrl', state.url);
            this.router.navigate(['auth/login']);
            return false;
        }
    }
}
