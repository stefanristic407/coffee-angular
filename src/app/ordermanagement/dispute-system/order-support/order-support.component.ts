import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-order-support',
  templateUrl: './order-support.component.html',
  styleUrls: ['./order-support.component.css']
})
export class OrderSupportComponent implements OnInit {
  term: any;
  buttonValue: string;
  orderID: string = '';
  orderType: string = '';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.orderID = decodeURIComponent(this.route.snapshot.queryParams['id']);
    this.orderType = this.route.snapshot.queryParams['orderType'] ? decodeURIComponent(this.route.snapshot.queryParams['orderType']) : '';
  }
  navigateSupportPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: this.orderID,
        orderType: this.orderType ? this.orderType : undefined,
        buttonValue: encodeURIComponent(this.buttonValue)
      }
    };


    this.router.navigate(["/ordermanagement/order-support-faqs"], navigationExtras);
  }

  buyingCoffee() {
    this.buttonValue = "Buying Coffee";
    this.navigateSupportPage();
  }
  requestSamples() {
    this.buttonValue = "Requesting Samples";
    this.navigateSupportPage();

  }
  payment() {
    this.buttonValue = "Payment";
    this.navigateSupportPage();
  }
  coffeeBulks() {
    this.buttonValue = "Coffee Bulks";
    this.navigateSupportPage();
  }
  shipping() {
    this.buttonValue = "Shipping";
    this.navigateSupportPage();
  }
  others() {
    this.buttonValue = "Others";
    this.navigateSupportPage();
  }

}
