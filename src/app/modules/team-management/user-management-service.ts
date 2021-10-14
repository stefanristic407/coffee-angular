import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserManagementSearchService {
    search: any = new BehaviorSubject('');
    search$: any = this.search.asObservable();
    role: any = new BehaviorSubject('');
    role$: any = this.role.asObservable();
    allrole: any = new BehaviorSubject('');
    allrole$: any = this.allrole.asObservable();
    status: any = new BehaviorSubject('');
    status$: any = this.status.asObservable();

    setSearch(search) {
        this.search.next(search);
    }

    setRole(role) {
        this.role.next(role);
    }

    setAllRole(allrole) {
        this.allrole.next(allrole);
    }

    setStatus(status) {
        this.status.next(status);
    }

    clearSearch() {
        this.search.next('');
    }

    capitalizeFirstLetter(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    public getReadableName(name) {
        return name ? name.replace(/_/g, ' ').replace(/-/g, ' ') : name;
    }
}
