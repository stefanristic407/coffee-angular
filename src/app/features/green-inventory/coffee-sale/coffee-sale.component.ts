import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-coffee-sale',
  templateUrl: './coffee-sale.component.html',
  styleUrls: ['./coffee-sale.component.css']
})
export class CoffeeSaleComponent implements OnInit {
  appLanguage?: any;
  coffeeSaleActive:any =0;
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
    this.getOrderDetails();
  }
  getOrderDetails(){
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
  language(){
    this.appLanguage = this.globals.languageJson;
    this.coffeeSaleActive++;
  }
  createSale(){
    let data = this.saleInformation;
    this.roasterService.CreateMarkForSale(this.roaster_id, this.orderID, data).subscribe(
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
