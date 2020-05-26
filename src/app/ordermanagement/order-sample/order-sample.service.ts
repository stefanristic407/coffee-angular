import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderSampleService {
  statusPaid : boolean = false;
  statusPending : boolean = true;
  beforeGradeComplete : boolean = true;
  afterGradeComplete : boolean = false;
  
  constructor() { }
  paymentStatus(){
    this.statusPending = false;
    this.statusPaid = true;
  }
}
