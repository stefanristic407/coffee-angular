import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AccessType } from '@enums';

@Injectable({
    providedIn: 'root',
})
export class AclService {
    permissions: any = {};

    constructor(private cookieService: CookieService, private router: Router) {}

    checkItem(slug, accessType = AccessType.View) {
        return (
            this.permissions[slug] &&
            (accessType === AccessType.View || accessType === this.permissions[slug][accessType])
        );
    }

    loadPermission() {
        try {
            this.permissions = JSON.parse(this.cookieService.get('permissionSlug'));
        } catch {
            this.router.navigateByUrl('/gate');
        }
    }

    updatePermission(permissionList: any[]) {
        this.permissions = {};
        permissionList.forEach((element) => {
            this.permissions[element.slug] = element.access_type;
        });
        this.cookieService.set('permissionSlug', JSON.stringify(this.permissions));
    }
}
