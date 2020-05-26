import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderPrebookService {
statusPending : boolean = true;
statusPaid : boolean = false;
beforeGradeComplete : boolean = true;
afterGradeComplete : boolean = false;
  constructor() { }

  changePaymentStatus(){
    this.statusPaid = true;
    this.statusPending = false;
  }
}
