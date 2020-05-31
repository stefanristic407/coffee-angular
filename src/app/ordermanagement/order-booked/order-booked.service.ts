import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderBookedService {
statusPaid : boolean = false;
statusPending : boolean = true;
beforeGradeComplete : boolean = true;
afterGradeComplete : boolean = false;
shipmentDone : boolean = false;
  constructor() { }
  paymentStatus(){
    this.statusPending = false;
    this.statusPaid = true;
  }
}
