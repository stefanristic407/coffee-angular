import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RoasteryProfileService } from '../../../roastery-profile/roastery-profile.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-available-confirm-order',
  templateUrl: './available-confirm-order.component.html',
  styleUrls: ['./available-confirm-order.component.css']
})
export class AvailableConfirmOrderComponent implements OnInit {
  quantity:any;
  quantity1:any;
  price:number=450;
  confirmOrderError:any;
  modalRef: BsModalRef;

  country : string = '';
state: string = '';
address1 : string;
address2 : string;
zipcode: string;
city: string;
countryError: string;
addressError : string;
zipError:string;
cityError:string;
 
constructor(private modalService: BsModalService,public confirmOrderService : RoasteryProfileService,public router:Router) { }
@ViewChild('confirmtemplate') private confirmtemplate: any;

openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);

}
ngOnInit(): void {
  this.quantity="";
  this.quantity1="";
  this.confirmOrderError="";
  this.countryError= "";
  this.addressError = "";
  this.zipError= "";
  this.cityError="";
  // this.price="$450";
}
placeOrder(){
  if(this.quantity=="" || this.quantity == null || this.quantity == undefined){
    this.confirmOrderError = "Please enter quantity";
    document.getElementById('quantityId').style.border = "1px solid #D50000";
    setTimeout(() => {
      this.confirmOrderError = "";
      document.getElementById('quantityId').style.border = "1px solid #d6d6d6 ";
    }, 3000);
  }
  else{
  this.openModal(this.confirmtemplate);
  }
}
placeOrderMob(){
  if(this.quantity1=="" || this.quantity1 == null || this.quantity1 == undefined){
    this.confirmOrderError = "Please enter quantity";
    document.getElementById('quantity_id').style.border = "1px solid #D50000";
    setTimeout(() => {
      this.confirmOrderError = "";
      document.getElementById('quantity_id').style.border = "1px solid #d6d6d6 ";
    }, 3000);
  }
  else{
  this.openModal(this.confirmtemplate);
  }
}
editAddress(){
  document.getElementById("edit-shipping").style.display = "none";
  document.getElementById("form-address").style.display = "block";

}
saveAddress(){
  if(this.country=="" || this.country == null || this.country == undefined){
    this.countryError= "Please select your country";
    document.getElementById('country').style.border = "1px solid #D50000 ";
    setTimeout(() => {
      this.countryError = "";
      document.getElementById('country').style.border = "1px solid #d6d6d6 ";
    }, 3000);
  }
  else if(this.address1=="" || this.address1 == null || this.address1 == undefined){
    this.addressError = "Please enter address";
    document.getElementById('address1').style.border = "1px solid #D50000 ";
    setTimeout(() => {
      this.addressError = "";
      document.getElementById('address1').style.border = "1px solid #d6d6d6 ";
    }, 3000);
  }
  else if(this.city=="" || this.city == null || this.city == undefined){
    this.cityError = "Please enter city";
    document.getElementById('city').style.border = "1px solid #D50000 ";
    setTimeout(() => {
      this.cityError = "";
      document.getElementById('city').style.border = "1px solid #d6d6d6 ";
    }, 3000);
  }
  else if(this.zipcode=="" || this.zipcode == null || this.zipcode == undefined){
    this.zipError = "Please enter zipcode";
    document.getElementById('zipcode').style.border = "1px solid #D50000 ";
    setTimeout(() => {
      this.zipError = "";
      document.getElementById('zipcode').style.border = "1px solid #d6d6d6 ";
    }, 3000);
  }
  else{
    document.getElementById("edit-shipping").style.display = "block";
    document.getElementById("form-address").style.display = "none";
  }
}

//  Function Name :Country Selection .
// Description: To select a country.

changeCountry() {
  // console.log("the selected country is : " + this.country);
  this.confirmOrderService.changeCountry(this.country);
}
onKeyPress(event: any) {
  if (event.target.value == "") {
    document.getElementById(event.target.id).style.border = "1px solid #D50000";
  } else {
    document.getElementById(event.target.id).style.border = "1px solid #d6d6d6";
  }
}
done(){
  this.router.navigate(["/features/order-placed"]);
}
}
