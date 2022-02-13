import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserManagementSearchService {
    clearFilters$: Subject<boolean> = new Subject<boolean>();
    search$: Subject<string> = new Subject<string>();
    role$: Subject<string> = new Subject<string>();
    allrole$: Subject<string> = new Subject<string>();
    status$: Subject<string> = new Subject<string>();

    setSearch(search) {
        this.search$.next(search);
    }

    setRole(role) {
        this.role$.next(role);
    }

    setAllRole(allrole) {
        this.allrole$.next(allrole);
    }

    setStatus(status) {
        this.status$.next(status);
    }

    clearFilters() {
        this.search$.next('');
        this.role$.next('');
        this.allrole$.next('');
        this.status$.next('');
        this.clearFilters$.next(true);
    }
}
