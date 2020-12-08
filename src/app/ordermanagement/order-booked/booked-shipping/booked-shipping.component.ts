import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';


@Component({
  selector: 'app-booked-shipping',
  templateUrl: './booked-shipping.component.html',
  styleUrls: ['./booked-shipping.component.css']
})
export class BookedShippingComponent implements OnInit {
  appLanguage?:any;
  constructor(public globals: GlobalsService) { }

  ngOnInit(): void {
    this.appLanguage = this.globals.languageJson;
  }
}
