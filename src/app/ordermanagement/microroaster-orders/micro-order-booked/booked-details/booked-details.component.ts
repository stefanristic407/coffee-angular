import { Component, OnInit } from '@angular/core';
import {MicroOrderBookedService } from '../micro-order-booked.service';


@Component({
  selector: 'app-booked-details',
  templateUrl: './booked-details.component.html',
  styleUrls: ['./booked-details.component.css']
})
export class BookedDetailsComponent implements OnInit {

  files: FileList;

  constructor(public microroasterBookedService: MicroOrderBookedService) { }

  ngOnInit(): void {
    
  }

  // Function Name : Upload receipt
  // Description: This function helps to upload receipt in order details tab of order sample.
  openFile(event) {
    this.files = event.target.files;
    this.microroasterBookedService.uploadShow = false;
    this.microroasterBookedService.receiptShow = true;
  }

  uploadReceipt(){
    this.microroasterBookedService.uploadShow = false;
    this.microroasterBookedService.receiptShow = true;
}

}
