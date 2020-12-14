// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Order Details for booked type order.
import { Component, OnInit } from '@angular/core';
import { OrderBookedService } from '../order-booked.service';
import { GlobalsService } from 'src/services/globals.service';
import { RoasteryProfileService } from 'src/app/features/roastery-profile/roastery-profile.service';

@Component({
  selector: 'app-booked-order-details',
  templateUrl: './booked-order-details.component.html',
  styleUrls: ['./booked-order-details.component.css']
})
export class BookedOrderDetailsComponent implements OnInit {
  files: FileList;
  appLanguage?:any;
  countryValue: any;
  constructor(public bookedService: OrderBookedService,public globals: GlobalsService,public profileservice:RoasteryProfileService) {
	// this.bookedService.viewAvailability();

   }

  ngOnInit(): void {
    this.appLanguage = this.globals.languageJson;
  }
  // Function Name : Upload receipt
  // Description: This function helps to upload receipt in order details tab of order booked .
  openFile(event) {
    this.files = event.target.files;
    this.bookedService.uploadShow = false;
    this.bookedService.receiptShow = true;
  }
  
  uploadReceipt(){
    this.bookedService.uploadShow = false;
    this.bookedService.receiptShow = true;
}
getPrice(){
	if(this.bookedService.price){
		return this.bookedService.price*this.bookedService.quantity;
	}
}

GetCountry(data:any){
  // console.log(data.toUpperCase());
  if(data){
    this.countryValue=this.profileservice.countryList.find(con =>con.isoCode == data.toUpperCase());
    if(this.countryValue){
    return this.countryValue.name;
    }
  }
}
}
