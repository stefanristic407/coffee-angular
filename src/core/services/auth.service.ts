import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubject = new BehaviorSubject(null);
  get currentUser(): any {
    return this.userSubject.value;
  }

  constructor() { }
}
