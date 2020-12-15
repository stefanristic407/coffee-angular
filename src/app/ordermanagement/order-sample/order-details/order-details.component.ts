// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Order Details for sample type order.
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderSampleService } from '../order-sample.service';
import { GlobalsService } from 'src/services/globals.service';
import { RoasteryProfileService } from 'src/app/features/roastery-profile/roastery-profile.service';

@Component({
  selector: 'sewn-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
 
  files: FileList;
	appLanguage?: any;
  SampleOrderActive:any =0;
  countryValue: any;

  constructor(public sampleService: OrderSampleService,
    public globals: GlobalsService,public profileservice:RoasteryProfileService) { }

  ngOnInit(): void {
    this.language();
  }

  // Function Name : Upload receipt
  // Description: This function helps to upload receipt in order details tab of order sample.
  openFile(event) {
    this.files = event.target.files;
    this.sampleService.uploadShow = false;
    this.sampleService.receiptShow = true;
  }

  uploadReceipt(){
    this.sampleService.uploadShow = false;
    this.sampleService.receiptShow = true;
}
language(){
  this.appLanguage = this.globals.languageJson;
     this.SampleOrderActive++;
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
  getPrice(){
    if(this.sampleService.price){
      return this.sampleService.price*this.sampleService.quantity;
    }
  }
}
