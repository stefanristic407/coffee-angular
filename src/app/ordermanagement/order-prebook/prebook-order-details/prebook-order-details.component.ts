// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Order Details for pre-book type order.
import { Component, OnInit } from '@angular/core';
import { OrderPrebookService } from '../order-prebook.service';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'sewn-prebook-order-details',
  templateUrl: './prebook-order-details.component.html',
  styleUrls: ['./prebook-order-details.component.css']
})
export class PrebookOrderDetailsComponent implements OnInit {
  files: FileList;
  receiptShow: boolean = false;
  uploadShow: boolean = true;
  appLanguage? :any;
  constructor(public prebookService: OrderPrebookService,public global: GlobalsService) { }

  ngOnInit(): void {
    this.appLanguage = this.global.languageJson;
  }
  // Function Name : Upload receipt
  // Description: This function helps to upload receipt in order details tab of order pre-book.
  openFile(event) {
    this.files = event.target.files;
    this.uploadShow = false;
    this.receiptShow = true;
  }

}
