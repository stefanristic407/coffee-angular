// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Order Details for sample type order.
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderSampleService } from '../order-sample.service';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'sewn-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
 
  files: FileList;
	appLanguage: any;
  SampleOrderActive:any =0;

  constructor(public sampleService: OrderSampleService,
    public global: GlobalsService) { }

  ngOnInit(): void {
    this.language();
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
language(){
  this.appLanguage = this.global.languageJson;
     this.SampleOrderActive++;
  }
}
