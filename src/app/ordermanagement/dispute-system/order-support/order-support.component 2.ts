import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-order-support',
  templateUrl: './order-support.component.html',
  styleUrls: ['./order-support.component.css']
})
export class OrderSupportComponent implements OnInit {
  term : any;
  buttonValue: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  buyingCoffee(){
    this.buttonValue = "Buying Coffee";
    let navigationExtras: NavigationExtras = {
      queryParams: {
        buttonValue: encodeURIComponent(this.buttonValue)
      }
    };

    this.router.navigate(["/ordermanagement/order-support-faqs"], navigationExtras);
  }
  requestSamples(){
    this.buttonValue = "Requesting Samples";
    let navigationExtras: NavigationExtras = {
      queryParams: {
        buttonValue: encodeURIComponent(this.buttonValue)
      }
    };

    this.router.navigate(["/ordermanagement/order-support-faqs"], navigationExtras);
  }
  payment(){
    this.buttonValue = "Payment";
    let navigationExtras: NavigationExtras = {
      queryParams: {
        buttonValue: encodeURIComponent(this.buttonValue)
      }
    };

    this.router.navigate(["/ordermanagement/order-support-faqs"], navigationExtras);
  }
  coffeeBulks(){
    this.buttonValue = "Coffee Bulks";
    let navigationExtras: NavigationExtras = {
      queryParams: {
        buttonValue: encodeURIComponent(this.buttonValue)
      }
    };

    this.router.navigate(["/ordermanagement/order-support-faqs"], navigationExtras);
  }
  shipping(){
    this.buttonValue = "Shipping";
    let navigationExtras: NavigationExtras = {
      queryParams: {
        buttonValue: encodeURIComponent(this.buttonValue)
      }
    };

    this.router.navigate(["/ordermanagement/order-support-faqs"], navigationExtras);
  }
  others(){
    this.buttonValue = "Others";
    let navigationExtras: NavigationExtras = {
      queryParams: {
        buttonValue: encodeURIComponent(this.buttonValue)
      }
    };

    this.router.navigate(["/ordermanagement/order-support-faqs"], navigationExtras);
  }

}
