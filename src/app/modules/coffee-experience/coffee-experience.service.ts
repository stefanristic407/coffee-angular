import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CoffeeExpService {
    search: any = new BehaviorSubject('');
    search$: any = this.search.asObservable();

    setSearch(search) {
        this.search.next(search);
    }

    clearSearch() {
        this.search.next('');
    }
}
