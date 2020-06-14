// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Payment Status for booked type order.
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderBookedService {
  statusPaid: boolean = false;
  statusPending: boolean = true;
  beforeGradeComplete: boolean = true;
  afterGradeComplete: boolean = false;
  shipmentDone: boolean = false;
  constructor() { }
  // Function Name : Payment Status
  // Description: This function helps to store status of payment.
  paymentStatus() {
    this.statusPending = false;
    this.statusPaid = true;
  }
}
