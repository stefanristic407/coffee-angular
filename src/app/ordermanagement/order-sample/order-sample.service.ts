// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Payment Status for sample type order.
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class OrderSampleService {
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
