import { Component, OnInit } from '@angular/core';
import { OrderPrebookService } from '../order-prebook.service';

@Component({
  selector: 'sewn-prebook-order-details',
  templateUrl: './prebook-order-details.component.html',
  styleUrls: ['./prebook-order-details.component.css']
})
export class PrebookOrderDetailsComponent implements OnInit {
files : FileList;
receiptShow : boolean = false;
uploadShow : boolean = true;
  constructor(public prebookService : OrderPrebookService) { }

  ngOnInit(): void {
  }
  openFile(event){
this.files = event.target.files;
this.uploadShow = false;
this.receiptShow = true;
  }

}
