import { Component, OnInit } from '@angular/core';
import { MicroOrderSampleService } from '../micro-order-sample.service';

@Component({
  selector: 'app-sample-details',
  templateUrl: './sample-details.component.html',
  styleUrls: ['./sample-details.component.css']
})
export class SampleDetailsComponent implements OnInit {

  files: FileList;

  constructor(public microroasterSampleService: MicroOrderSampleService) { }

  ngOnInit(): void {
    
  }

  // Function Name : Upload receipt
  // Description: This function helps to upload receipt in order details tab of order sample.
  openFile(event) {
    this.files = event.target.files;
    this.microroasterSampleService.uploadShow = false;
    this.microroasterSampleService.receiptShow = true;
  }

  uploadReceipt(){
    this.microroasterSampleService.uploadShow = false;
    this.microroasterSampleService.receiptShow = true;
}

}
