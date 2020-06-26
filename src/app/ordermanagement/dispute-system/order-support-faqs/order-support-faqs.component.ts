import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-support-faqs',
  templateUrl: './order-support-faqs.component.html',
  styleUrls: ['./order-support-faqs.component.css']
})
export class OrderSupportFaqsComponent implements OnInit {
  headerValue : any;
  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.headerValue = decodeURIComponent(
      this.route.snapshot.queryParams["buttonValue"]
    );
  }

}
