import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MicroOrderBookedService {
  uploadShow: boolean = true;
	statusPending : boolean = true;
	statusPaid : boolean = false;
	receiptShow : boolean = false;
	beforeGradeComplete: boolean = true;
	afterGradeComplete: boolean = false;
	shipment_status : boolean = false;
	constructor() { 
		this.statusPending = true;
	  }
}
