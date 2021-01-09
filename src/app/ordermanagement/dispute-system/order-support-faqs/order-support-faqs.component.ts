import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-support-faqs',
  templateUrl: './order-support-faqs.component.html',
  styleUrls: ['./order-support-faqs.component.css']
})
export class OrderSupportFaqsComponent implements OnInit {
  headerValue: any;
  orderID: string = '';
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.orderID = decodeURIComponent(this.route.snapshot.queryParams['id']);
    if (this.route.snapshot.queryParams["buttonValue"]) {
      this.headerValue = decodeURIComponent(
        this.route.snapshot.queryParams["buttonValue"]
      );
    }
  }

}
