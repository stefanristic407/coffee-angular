import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RoasteryProfileService } from '../../../features/roastery-profile/roastery-profile.service';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'app-prebook-confirm-order',
  templateUrl: './prebook-confirm-order.component.html',
  styleUrls: ['./prebook-confirm-order.component.css']
})
export class PrebookConfirmOrderComponent implements OnInit {
  quantity:any;
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
  service: string = "Import & Delivery service";
  serviceAmount: number = 4500;
  appLanguage:any;
  constructor(private modalService: BsModalService,public confirmOrderService : RoasteryProfileService,public global: GlobalsService) { }
  @ViewChild('confirmtemplate') private confirmtemplate: any;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

  }
  ngOnInit(): void {
    this.appLanguage = this.global.languageJson;
    this.quantity='';
	this.confirmOrderError='';
	this.countryError= "";
    this.addressError = "";
    this.zipError= "";
    this.cityError="";
    // this.price="$450";
  }
  placeOrder(){
    if(this.quantity=="" || this.quantity == null || this.quantity == undefined){
      this.confirmOrderError = "Please enter quantity";
      document.getElementById('quantityId').style.border = "1px solid #D50000 ";
      setTimeout(() => {
        this.confirmOrderError = "";
        document.getElementById('quantityId').style.border = "1px solid #d6d6d6 ";
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
}
