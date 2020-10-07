// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Order Details for booked type order.
import { Component, OnInit } from '@angular/core';
import { OrderBookedService } from '../order-booked.service';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'app-booked-order-details',
  templateUrl: './booked-order-details.component.html',
  styleUrls: ['./booked-order-details.component.css']
})
export class BookedOrderDetailsComponent implements OnInit {
  files: FileList;
  appLanguage:any;
  constructor(public bookedService: OrderBookedService,public global: GlobalsService) { }

  ngOnInit(): void {
    this.appLanguage = this.global.languageJson;
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
