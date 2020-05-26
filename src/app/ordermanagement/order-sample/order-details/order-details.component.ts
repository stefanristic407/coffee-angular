import { Component, OnInit } from '@angular/core';
import { OrderSampleService } from '../order-sample.service';

@Component({
  selector: 'sewn-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  files : FileList;
  uploadShow : boolean = true;
  receiptShow : boolean = false;
  constructor(public sampleService : OrderSampleService) { }

  ngOnInit(): void {
  }
  openFile(event){
    this.files = event.target.files;
    this.uploadShow = false;
    this.receiptShow = true;
      }
}
