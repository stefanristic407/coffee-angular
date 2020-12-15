import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { OrderBookedService } from '../order-booked.service';


@Component({
  selector: 'app-booked-shipping',
  templateUrl: './booked-shipping.component.html',
  styleUrls: ['./booked-shipping.component.css']
})
export class BookedShippingComponent implements OnInit {
  appLanguage?:any;
  constructor(public globals: GlobalsService,public bookedService: OrderBookedService) { }

  ngOnInit(): void {
    this.appLanguage = this.globals.languageJson;
  }
}
