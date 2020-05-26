import { Component, OnInit } from '@angular/core';
import { OrderBookedService } from '../order-booked.service';

@Component({
  selector: 'app-booked-order-details',
  templateUrl: './booked-order-details.component.html',
  styleUrls: ['./booked-order-details.component.css']
})
export class BookedOrderDetailsComponent implements OnInit {
files : FileList;
uploadShow : boolean = true;
receiptShow : boolean = false;
  constructor(public bookedService : OrderBookedService) { }

  ngOnInit(): void {
  }
  openFile(event){
this.files = event.target.files;
this.uploadShow = false;
this.receiptShow = true;
  }

}
