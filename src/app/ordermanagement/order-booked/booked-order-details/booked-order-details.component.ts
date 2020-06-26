// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Order Details for booked type order.
import { Component, OnInit } from '@angular/core';
import { OrderBookedService } from '../order-booked.service';

@Component({
  selector: 'app-booked-order-details',
  templateUrl: './booked-order-details.component.html',
  styleUrls: ['./booked-order-details.component.css']
})
export class BookedOrderDetailsComponent implements OnInit {
  files: FileList;

  constructor(public bookedService: OrderBookedService) { }

  ngOnInit(): void {
  }
  // Function Name : Upload receipt
  // Description: This function helps to upload receipt in order details tab of order booked .
  openFile(event) {
    this.files = event.target.files;
    this.bookedService.uploadShow = false;
    this.bookedService.receiptShow = true;
  }
  
  uploadReceipt(){
    this.bookedService.uploadShow = false;
    this.bookedService.receiptShow = true;
}

}
