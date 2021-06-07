import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as _ from 'underscore';

@Injectable({
    providedIn: 'root',
})
export class AclService {
    permissions: any = {};

    constructor(private cookieService: CookieService, private router: Router) {}

    checkPermission(permission) {
        if (!permission) {
            return true;
        }
        const multiPermissions = permission.split('|');
        for (const key in multiPermissions) {
            if (this.checkMultiPermission(multiPermissions[key].split('&'))) {
                return true;
            }
        }
        return false;
    }

    private checkMultiPermission(permissionArray): boolean {
        for (const key in permissionArray) {
            if (!this.permissions[permissionArray[key]]) {
                return false;
            }
        }
        return true;
    }

    loadPermission(permissionList: any[]) {
        const permissionArray = _.pluck(permissionList, 'slug');
        permissionArray.forEach((element) => {
            this.permissions[element] = true;
        });
    }
}
