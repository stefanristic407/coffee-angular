import { Injectable } from '@angular/core';
import { UserPreference } from '@models';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    isSimulated = false;
    private orgId: number;
    userSubject = new BehaviorSubject(null);
    organizationSubject = new BehaviorSubject(null);
    preferenceSubject: BehaviorSubject<UserPreference> = new BehaviorSubject(null);

    get token(): any {
        if (this.isSimulated) {
            const simToken = this.cookieService.get('Sim-Authorization');
            if (simToken) {
                return JSON.parse(atob(simToken)).Authorization;
            }
        } else {
            return this.cookieService.get('Authorization');
        }
        return null;
    }

    getOrgId(): number {
        return this.orgId;
    }

    setOrgId(value: number) {
        this.orgId = value;
    }

    get userId(): number {
        return this.currentUser?.id || null;
    }

    get isAuthenticated(): boolean {
        return !!this.token;
    }

    get currentUser(): any {
        return this.userSubject.value;
    }

    get currentOrganization(): any {
        return this.organizationSubject.value;
    }

    get preference(): UserPreference {
        return this.preferenceSubject.value;
    }

    get isAdmin(): boolean {
        return (
            this.currentUser && this.currentOrganization && this.currentUser.id === this.currentOrganization.admin_id
        );
    }

    constructor(private cookieService: CookieService) {}
}
