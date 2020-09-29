import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HorecaSubscriptionDetailsService {
  statusPending : boolean = true;
  statusPaid : boolean = false;
  receiptShow : boolean = false;
  shipment_status : boolean = false;
  constructor() { 
    this.statusPending = true;
  }
}
