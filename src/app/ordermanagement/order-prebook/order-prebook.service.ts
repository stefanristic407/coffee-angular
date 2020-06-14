// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Payment Status for pre-book type order.
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderPrebookService {
  statusPending: boolean = true;
  statusPaid: boolean = false;
  beforeGradeComplete: boolean = true;
  afterGradeComplete: boolean = false;
  constructor() { }

  // Function Name : Payment Status
  // Description: This function helps to store status of payment.
  changePaymentStatus() {
    this.statusPaid = true;
    this.statusPending = false;
  }
}
