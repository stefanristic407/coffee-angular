// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Order Details for sample type order.
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderSampleService } from '../order-sample.service';

@Component({
  selector: 'sewn-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
 

  files: FileList;

  constructor(public sampleService: OrderSampleService) { }

  ngOnInit(): void {
    
  }

  // Function Name : Upload receipt
  // Description: This function helps to upload receipt in order details tab of order sample.
  openFile(event) {
    this.files = event.target.files;
    this.sampleService.uploadShow = false;
    this.sampleService.receiptShow = true;
  }

  uploadReceipt(){
    this.sampleService.uploadShow = false;
    this.sampleService.receiptShow = true;
}
}
