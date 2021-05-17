import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    userSubject = new BehaviorSubject(null);
    organizationSubject = new BehaviorSubject(null);

    get currentUser(): any {
        return this.userSubject.value;
    }

    get currentOrganization(): any {
        return this.organizationSubject.value;
    }

    constructor(private cookieService: CookieService) {}
}
