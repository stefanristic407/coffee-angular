import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lot-sale',
  templateUrl: './lot-sale.component.html',
  styleUrls: ['./lot-sale.component.css']
})
export class LotSaleComponent implements OnInit {
  appLanguage?: any;
  lotSaleActive:any =0;
  roaster_id:any='';
  orderDetails:any;
  orderID:any='';
  saleInformation:any = {};

  constructor(public globals: GlobalsService, public route: ActivatedRoute, 
    public roasterService:RoasterserviceService, public cookieService: CookieService, private router: Router,) {
      this.roaster_id = this.cookieService.get('roaster_id');
  }
  ngOnInit(): void {
    this.language();
    this.saleInformation['name'] = '';
    this.saleInformation['price'] = '';
    this.saleInformation['price_unit'] = 'per kg';
    this.saleInformation['quantity'] = '';
    this.saleInformation['quantity_type'] = 'per kg';
    this.saleInformation['minimum_purchase_quantity'] = '';
    this.saleInformation['vat_rate'] = '';
    this.getSaleOrderDetails();
    this.getSaleOrderDetails();
  }
  language(){
    this.appLanguage = this.globals.languageJson;
    this.lotSaleActive++;
  }
  getSaleOrderDetails(){
		this.orderID = decodeURIComponent(this.route.snapshot.queryParams['orderId']);
		this.roasterService.getMarkForSaleDetails(this.roaster_id, this.orderID).subscribe(
			response => {
			  console.log(response);
			  if(response['success'] && response['result']){
				  this.saleInformation = response['result'];
			  }
			}, err =>{
			  console.log(err);
			}
		);	
	}
	getProcuredOrderDetails(){
		this.orderID = decodeURIComponent(this.route.snapshot.queryParams['orderId']);
		this.roasterService.getProcuredCoffeeDetails(this.roaster_id, this.orderID).subscribe(
			response => {
			  console.log(response);
			  if(response['success'] && response['result']){
				  this.orderDetails = response['result'];
			  }
			}, err =>{
			  console.log(err);
			}
		);	
  }
  updateRole(){
    let data = this.saleInformation;
    data['order_id'] = undefined;
    data['initial_quantity'] = undefined;
    data['quantity_count'] = undefined;
    data['roaster_id'] = undefined;
    data['status'] = undefined;
    this.roasterService.updateMarkForSale(this.roaster_id, this.orderID, data).subscribe(
			response => {
			  console.log(response);
			  if(response && response['success']){
          this.router.navigate(["/features/green-coffee-inventory"]);
        }
			}, err =>{
			  console.log(err);
			}
		);	
  }
}
